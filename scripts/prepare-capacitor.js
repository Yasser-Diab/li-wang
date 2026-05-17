const fs = require("fs/promises");
const path = require("path");

const project_root = path.resolve(__dirname, "..");
const mobile_web_dir = path.join(project_root, "dist", "mobile");
const audio_extensions = new Set([".mp3", ".wav", ".ogg", ".m4a", ".aac"]);
const static_entries = [
  "favicon.svg",
  "styles.css",
  "script.js",
  "supabase-config.js",
  "assets",
  "data",
  "sound",
];

async function path_exists(target_path) {
  try {
    await fs.access(target_path);
    return true;
  } catch (error) {
    return false;
  }
}

async function reset_directory(target_path) {
  await fs.rm(target_path, { recursive: true, force: true });
  await fs.mkdir(target_path, { recursive: true });
}

async function copy_entry(relative_path) {
  const source_path = path.join(project_root, relative_path);
  const destination_path = path.join(mobile_web_dir, relative_path);

  if (!(await path_exists(source_path))) {
    return;
  }

  await fs.cp(source_path, destination_path, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });
}

function to_public_path(absolute_path) {
  const relative_path = path.relative(project_root, absolute_path);
  const encoded_segments = relative_path
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment));

  return `/${encoded_segments.join("/")}`;
}

async function list_audio_files(directory_path) {
  try {
    const entries = await fs.readdir(directory_path, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(directory_path, entry.name))
      .filter((file_path) =>
        audio_extensions.has(path.extname(file_path).toLowerCase()),
      )
      .sort((left_path, right_path) => left_path.localeCompare(right_path));

    return files.map(to_public_path);
  } catch (error) {
    return [];
  }
}

async function build_sound_manifest() {
  const manifest = {
    background_music: [],
    welcome: [],
    logout: [],
    message_send: [],
    message_receive: [],
  };

  for (const base_name of ["sounds", "sound"]) {
    const base_path = path.join(project_root, base_name);

    manifest.background_music.push(
      ...(await list_audio_files(path.join(base_path, "music"))),
      ...(await list_audio_files(path.join(base_path, "background"))),
      ...(await list_audio_files(base_path)),
    );
    manifest.welcome.push(await list_audio_files(path.join(base_path, "welcome")));
    manifest.logout.push(await list_audio_files(path.join(base_path, "logout")));
    manifest.message_send.push(
      await list_audio_files(path.join(base_path, "send")),
    );
    manifest.message_receive.push(
      await list_audio_files(path.join(base_path, "receive")),
    );
  }

  for (const key of Object.keys(manifest)) {
    manifest[key] = [...new Set(manifest[key].flat())];
  }

  return manifest;
}

async function write_mobile_index() {
  const index_path = path.join(project_root, "index.html");
  const destination_path = path.join(mobile_web_dir, "index.html");
  const cdn_supabase_script =
    '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>';
  const local_supabase_script = '<script src="vendor/supabase.js"></script>';
  const html = await fs.readFile(index_path, "utf8");

  await fs.writeFile(
    destination_path,
    html.replace(cdn_supabase_script, local_supabase_script),
  );
}

async function copy_supabase_bundle() {
  const source_path = path.join(
    project_root,
    "node_modules",
    "@supabase",
    "supabase-js",
    "dist",
    "umd",
    "supabase.js",
  );
  const destination_path = path.join(mobile_web_dir, "vendor", "supabase.js");

  await fs.mkdir(path.dirname(destination_path), { recursive: true });
  await fs.copyFile(source_path, destination_path);
}

async function write_static_api_files() {
  const api_dir = path.join(mobile_web_dir, "api");
  const sound_manifest = await build_sound_manifest();
  const sound_manifest_json = JSON.stringify(sound_manifest, null, 2);

  await fs.mkdir(api_dir, { recursive: true });
  await fs.writeFile(path.join(api_dir, "sound_manifest"), sound_manifest_json);
  await fs.writeFile(
    path.join(api_dir, "sound_manifest.json"),
    sound_manifest_json,
  );
}

async function prepare_mobile_web_assets() {
  await reset_directory(mobile_web_dir);

  await Promise.all(static_entries.map(copy_entry));
  await write_mobile_index();
  await copy_supabase_bundle();
  await write_static_api_files();

  console.log(`Prepared Capacitor web assets in ${mobile_web_dir}`);
}

prepare_mobile_web_assets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
