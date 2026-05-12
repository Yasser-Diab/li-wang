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
const night_tales_path = path.join(data_directory, "night_tales.json");
const night_tales_de_path = path.join(data_directory, "night_tales_de.json");

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
    await fs.writeFile(app_data_path, JSON.stringify({ memories: [], events: [] }, null, 2));
  }
}

async function read_app_data() {
  await ensure_data_file();
  const file_contents = await fs.readFile(app_data_path, "utf8");
  return JSON.parse(file_contents);
}

async function write_app_data(next_data) {
  await ensure_data_file();
  await fs.writeFile(app_data_path, JSON.stringify(next_data, null, 2));
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

async function handle_api_request(request, response) {
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
