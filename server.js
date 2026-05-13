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
  ".svg": "image/svg+xml"
};

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

    const safe_message = {
      id: String(message_item.id),
      sender_key: String(message_item.sender_key),
      sender_name: String(message_item.sender_name || ""),
      text: String(message_item.text || ""),
      created_at: String(message_item.created_at || new Date().toISOString()),
      edited_at: String(message_item.edited_at || ""),
      attachments: Array.isArray(message_item.attachments)
        ? message_item.attachments.map((attachment) => ({
            name: String(attachment.name || "file"),
            type: String(attachment.type || "application/octet-stream"),
            size: Number(attachment.size || 0),
            data_url: String(attachment.data_url || "")
          }))
        : []
    };

    const app_data = await read_app_data();
    app_data.live_messages = [...app_data.live_messages, safe_message].slice(-500);
    await write_app_data(app_data);
    broadcast_live_message(safe_message);

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

    const next_attachments = Array.isArray(body.attachments)
      ? body.attachments.map((attachment) => ({
          name: String(attachment.name || "file"),
          type: String(attachment.type || "application/octet-stream"),
          size: Number(attachment.size || 0),
          data_url: String(attachment.data_url || "")
        }))
      : existing_message.attachments;

    const updated_message = {
      ...existing_message,
      text: next_text,
      attachments: next_attachments,
      edited_at: new Date().toISOString()
    };

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
