const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const port = Number(process.env.PORT || 4174);
const public_root = __dirname;
const data_directory = path.join(__dirname, "data");
const app_data_path = path.join(data_directory, "app_data.json");
const daily_joy_path = path.join(data_directory, "daily_joy_messages.json");
const daily_love_path = path.join(data_directory, "daily_love_messages.json");
const daily_joy_de_path = path.join(data_directory, "daily_joy_messages_de.json");
const daily_love_de_path = path.join(data_directory, "daily_love_messages_de.json");
const daily_joy_ar_path = path.join(data_directory, "daily_joy_messages_ar.json");
const daily_love_ar_path = path.join(data_directory, "daily_love_messages_ar.json");
const morning_messages_path = path.join(data_directory, "morning_messages.json");
const morning_messages_de_path = path.join(data_directory, "morning_messages_de.json");
const morning_messages_ar_path = path.join(data_directory, "morning_messages_ar.json");
const night_messages_path = path.join(data_directory, "night_messages.json");
const night_messages_de_path = path.join(data_directory, "night_messages_de.json");
const night_messages_ar_path = path.join(data_directory, "night_messages_ar.json");
const night_tales_path = path.join(data_directory, "night_tales.json");
const night_tales_de_path = path.join(data_directory, "night_tales_de.json");
const night_tales_ar_path = path.join(data_directory, "night_tales_ar.json");
const live_message_clients = new Set();
const sound_directories = [
  path.join(__dirname, "sounds"),
  path.join(__dirname, "sound")
];

const credentials = {
  svetlana: "Wolf&Luna",
  diab: "Wolf&Luna"
};

const mime_types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac"
};

const audio_extensions = new Set([".mp3", ".wav", ".ogg", ".m4a", ".aac"]);

async function ensure_data_file() {
  await fs.mkdir(data_directory, { recursive: true });

  try {
    await fs.access(app_data_path);
  } catch (error) {
    await fs.writeFile(app_data_path, JSON.stringify({ memories: [], events: [], live_messages: [] }, null, 2));
  }
}

function normalize_app_data(app_data) {
  return {
    memories: Array.isArray(app_data.memories) ? app_data.memories : [],
    events: Array.isArray(app_data.events) ? app_data.events : [],
    live_messages: Array.isArray(app_data.live_messages) ? app_data.live_messages : []
  };
}

async function read_app_data() {
  await ensure_data_file();
  const file_contents = await fs.readFile(app_data_path, "utf8");
  return normalize_app_data(JSON.parse(file_contents));
}

async function write_app_data(next_data) {
  await ensure_data_file();
  await fs.writeFile(app_data_path, JSON.stringify(normalize_app_data(next_data), null, 2));
}

function build_public_file_path(absolute_path) {
  const relative_path = path.relative(public_root, absolute_path);
  return `/${relative_path.split(path.sep).map((segment) => encodeURIComponent(segment)).join("/")}`;
}

async function list_audio_files(directory_path) {
  try {
    const entries = await fs.readdir(directory_path, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(directory_path, entry.name))
      .filter((absolute_path) => audio_extensions.has(path.extname(absolute_path).toLowerCase()))
      .sort((left_path, right_path) => left_path.localeCompare(right_path))
      .map(build_public_file_path);
  } catch (error) {
    return [];
  }
}

async function read_sound_manifest() {
  const manifest = {
    background_music: [],
    welcome: [],
    logout: [],
    message_send: [],
    message_receive: []
  };

  for (const base_directory of sound_directories) {
    const background_paths = [
      ...(await list_audio_files(path.join(base_directory, "music"))),
      ...(await list_audio_files(path.join(base_directory, "background"))),
      ...(await list_audio_files(base_directory))
    ];

    const welcome_paths = await list_audio_files(path.join(base_directory, "welcome"));
    const logout_paths = await list_audio_files(path.join(base_directory, "logout"));
    const send_paths = await list_audio_files(path.join(base_directory, "send"));
    const receive_paths = await list_audio_files(path.join(base_directory, "receive"));

    manifest.background_music.push(...background_paths);
    manifest.welcome.push(...welcome_paths);
    manifest.logout.push(...logout_paths);
    manifest.message_send.push(...send_paths);
    manifest.message_receive.push(...receive_paths);
  }

  Object.keys(manifest).forEach((key) => {
    manifest[key] = [...new Set(manifest[key])];
  });

  return manifest;
}

async function read_request_body(request) {
  const chunks = [];
  let total_size = 0;
  const max_size = 12 * 1024 * 1024;

  for await (const chunk of request) {
    total_size += chunk.length;

    if (total_size > max_size) {
      throw new Error("request_body_too_large");
    }

    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function send_json(response, status_code, payload) {
  response.writeHead(status_code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function send_sse_event(response, event_name, payload) {
  response.write(`event: ${event_name}\n`);
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function broadcast_live_message(message_item) {
  for (const client of live_message_clients) {
    try {
      send_sse_event(client, "live_message", message_item);
    } catch (error) {
      live_message_clients.delete(client);
    }
  }
}

function broadcast_live_message_updated(message_item) {
  for (const client of live_message_clients) {
    try {
      send_sse_event(client, "live_message_updated", message_item);
    } catch (error) {
      live_message_clients.delete(client);
    }
  }
}

function broadcast_live_message_deleted(message_id) {
  for (const client of live_message_clients) {
    try {
      send_sse_event(client, "live_message_deleted", { id: message_id });
    } catch (error) {
      live_message_clients.delete(client);
    }
  }
}

function sanitize_message_segment(segment) {
  if (!segment || typeof segment !== "object") {
    return null;
  }

  const safe_segment = {
    type: String(segment.type || "text")
  };

  [
    "kind",
    "reference_type",
    "reference_id",
    "title",
    "subtitle",
    "text"
  ].forEach((key) => {
    if (segment[key] !== undefined) {
      safe_segment[key] = String(segment[key] || "");
    }
  });

  return safe_segment;
}

function sanitize_live_message_attachment(attachment) {
  if (!attachment || typeof attachment !== "object") {
    return null;
  }

  const safe_attachment = {};

  [
    "kind",
    "name",
    "type",
    "data_url",
    "reference_type",
    "reference_id",
    "title",
    "subtitle",
    "text",
    "preview_label",
    "preview_body",
    "user_key",
    "last_seen_at",
    "updated_at"
  ].forEach((key) => {
    if (attachment[key] !== undefined) {
      safe_attachment[key] = String(attachment[key] || "");
    }
  });

  if (attachment.size !== undefined) {
    safe_attachment.size = Number(attachment.size || 0);
  }

  if (attachment.visible !== undefined) {
    safe_attachment.visible = attachment.visible !== false;
  }

  if (attachment.active !== undefined) {
    safe_attachment.active = Boolean(attachment.active);
  }

  if (Array.isArray(attachment.hidden_deleted_message_ids)) {
    safe_attachment.hidden_deleted_message_ids = attachment.hidden_deleted_message_ids
      .map((item) => String(item || ""))
      .filter(Boolean);
  }

  if (Array.isArray(attachment.segments)) {
    safe_attachment.segments = attachment.segments
      .map(sanitize_message_segment)
      .filter(Boolean);
  }

  return safe_attachment;
}

function sanitize_live_message_item(message_item, existing_message = null) {
  return {
    id: String(message_item.id),
    room_slug: String(message_item.room_slug || existing_message?.room_slug || "svetlana-diab"),
    sender_key: String(message_item.sender_key),
    sender_name: String(message_item.sender_name || existing_message?.sender_name || ""),
    text: String(message_item.text || ""),
    created_at: String(
      message_item.created_at ||
        existing_message?.created_at ||
        new Date().toISOString()
    ),
    edited_at: String(message_item.edited_at || existing_message?.edited_at || ""),
    attachments: Array.isArray(message_item.attachments)
      ? message_item.attachments
          .map(sanitize_live_message_attachment)
          .filter(Boolean)
      : Array.isArray(existing_message?.attachments)
        ? existing_message.attachments
        : []
  };
}

async function handle_api_request(request, response) {
  const live_message_item_match = request.url.match(/^\/api\/live_messages\/([^/?#]+)$/);

  if (request.method === "POST" && request.url === "/api/login") {
    const body_text = await read_request_body(request);
    const body = JSON.parse(body_text || "{}");
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (credentials[username] === password) {
      send_json(response, 200, {
        ok: true,
        user_key: username,
        display_name: username === "svetlana" ? "Svetlana" : "Diab"
      });
      return true;
    }

    send_json(response, 401, {
      ok: false
    });
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_joy_messages") {
    const messages = JSON.parse(await fs.readFile(daily_joy_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_joy_messages_de") {
    const messages = JSON.parse(await fs.readFile(daily_joy_de_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_love_messages") {
    const messages = JSON.parse(await fs.readFile(daily_love_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_love_messages_de") {
    const messages = JSON.parse(await fs.readFile(daily_love_de_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_joy_messages_ar") {
    const messages = JSON.parse(await fs.readFile(daily_joy_ar_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/daily_love_messages_ar") {
    const messages = JSON.parse(await fs.readFile(daily_love_ar_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/morning_messages") {
    const messages = JSON.parse(await fs.readFile(morning_messages_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/morning_messages_de") {
    const messages = JSON.parse(await fs.readFile(morning_messages_de_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/morning_messages_ar") {
    const messages = JSON.parse(await fs.readFile(morning_messages_ar_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_messages") {
    const messages = JSON.parse(await fs.readFile(night_messages_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_messages_de") {
    const messages = JSON.parse(await fs.readFile(night_messages_de_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_messages_ar") {
    const messages = JSON.parse(await fs.readFile(night_messages_ar_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_tales") {
    const messages = JSON.parse(await fs.readFile(night_tales_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_tales_de") {
    const messages = JSON.parse(await fs.readFile(night_tales_de_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/night_tales_ar") {
    const messages = JSON.parse(await fs.readFile(night_tales_ar_path, "utf8"));
    send_json(response, 200, messages);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/sound_manifest") {
    const manifest = await read_sound_manifest();
    send_json(response, 200, manifest);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/memories") {
    const app_data = await read_app_data();
    send_json(response, 200, app_data.memories || []);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/events") {
    const app_data = await read_app_data();
    send_json(response, 200, app_data.events || []);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/live_messages") {
    const app_data = await read_app_data();
    send_json(response, 200, app_data.live_messages || []);
    return true;
  }

  if (request.method === "GET" && request.url === "/api/live_messages_stream") {
    response.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
      Connection: "keep-alive"
    });
    response.write("\n");
    live_message_clients.add(response);
    send_sse_event(response, "connected", { ok: true });
    request.on("close", () => {
      live_message_clients.delete(response);
      response.end();
    });
    return true;
  }

  if (request.method === "POST" && (request.url === "/api/memories" || request.url === "/api/events")) {
    const body_text = await read_request_body(request);
    const items = JSON.parse(body_text || "[]");

    if (!Array.isArray(items)) {
      send_json(response, 400, {
        ok: false
      });
      return true;
    }

    const item_type = request.url === "/api/memories" ? "memories" : "events";
    const app_data = await read_app_data();
    app_data[item_type] = items;
    await write_app_data(app_data);

    send_json(response, 200, {
      ok: true
    });
    return true;
  }

  if (request.method === "POST" && request.url === "/api/live_messages") {
    const body_text = await read_request_body(request);
    const message_item = JSON.parse(body_text || "{}");

    if (!message_item || typeof message_item !== "object" || !message_item.id || !message_item.sender_key) {
      send_json(response, 400, { ok: false });
      return true;
    }

    const app_data = await read_app_data();
    const existing_index = app_data.live_messages.findIndex(
      (item) => item.id === String(message_item.id)
    );
    const safe_message = sanitize_live_message_item(
      message_item,
      existing_index >= 0 ? app_data.live_messages[existing_index] : null
    );

    if (existing_index >= 0) {
      app_data.live_messages[existing_index] = safe_message;
    } else {
      app_data.live_messages = [...app_data.live_messages, safe_message].slice(-500);
    }
    await write_app_data(app_data);
    if (existing_index >= 0) {
      broadcast_live_message_updated(safe_message);
    } else {
      broadcast_live_message(safe_message);
    }

    send_json(response, 200, {
      ok: true,
      message: safe_message
    });
    return true;
  }

  if (live_message_item_match && request.method === "PATCH") {
    const message_id = decodeURIComponent(live_message_item_match[1]);
    const body_text = await read_request_body(request);
    const body = JSON.parse(body_text || "{}");
    const sender_key = String(body.sender_key || "");
    const next_text = String(body.text || "");
    const app_data = await read_app_data();
    const existing_message = app_data.live_messages.find((message_item) => message_item.id === message_id);

    if (!existing_message || existing_message.sender_key !== sender_key) {
      send_json(response, 404, { ok: false });
      return true;
    }

    const updated_message = sanitize_live_message_item({
      ...body,
      id: existing_message.id,
      room_slug: existing_message.room_slug,
      sender_key: existing_message.sender_key,
      sender_name: existing_message.sender_name,
      text: next_text,
      edited_at: new Date().toISOString()
    }, existing_message);

    app_data.live_messages = app_data.live_messages.map((message_item) =>
      message_item.id === message_id ? updated_message : message_item
    );
    await write_app_data(app_data);
    broadcast_live_message_updated(updated_message);
    send_json(response, 200, {
      ok: true,
      message: updated_message
    });
    return true;
  }

  if (live_message_item_match && request.method === "DELETE") {
    const message_id = decodeURIComponent(live_message_item_match[1]);
    const body_text = await read_request_body(request);
    const body = JSON.parse(body_text || "{}");
    const sender_key = String(body.sender_key || "");
    const app_data = await read_app_data();
    const existing_message = app_data.live_messages.find((message_item) => message_item.id === message_id);

    if (!existing_message || existing_message.sender_key !== sender_key) {
      send_json(response, 404, { ok: false });
      return true;
    }

    app_data.live_messages = app_data.live_messages.filter((message_item) => message_item.id !== message_id);
    await write_app_data(app_data);
    broadcast_live_message_deleted(message_id);
    send_json(response, 200, { ok: true });
    return true;
  }

  return false;
}

async function serve_static_file(request, response) {
  const requested_url = new URL(request.url, `http://${request.headers.host}`);
  const clean_path = requested_url.pathname === "/" ? "/index.html" : requested_url.pathname;
  const decoded_path = decodeURIComponent(clean_path);
  const absolute_path = path.normalize(path.join(public_root, decoded_path));

  if (!absolute_path.startsWith(public_root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file_contents = await fs.readFile(absolute_path);
    const extension = path.extname(absolute_path).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mime_types[extension] || "application/octet-stream"
    });
    response.end(file_contents);
  } catch (error) {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url.startsWith("/api/")) {
      const handled = await handle_api_request(request, response);

      if (handled) {
        return;
      }
    }

    await serve_static_file(request, response);
  } catch (error) {
    const status_code = error.message === "request_body_too_large" ? 413 : 500;
    send_json(response, status_code, {
      ok: false
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Svetlana and Diab space is open at http://127.0.0.1:${port}/`);
});
