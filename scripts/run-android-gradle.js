const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const project_root = path.resolve(__dirname, "..");
const android_dir = path.join(project_root, "android");
const local_sdk_dir = path.join(project_root, ".mobile-sdk", "android-sdk");

function first_directory(parent_path) {
  if (!fs.existsSync(parent_path)) {
    return "";
  }

  return (
    fs
      .readdirSync(parent_path, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(parent_path, entry.name))
      .sort()
      .at(-1) || ""
  );
}

function resolve_java_home() {
  if (process.env.JAVA_HOME && fs.existsSync(process.env.JAVA_HOME)) {
    return process.env.JAVA_HOME;
  }

  return (
    first_directory(path.join(project_root, ".mobile-sdk", "jdk21")) ||
    first_directory(path.join(project_root, ".mobile-sdk", "jdk"))
  );
}

function resolve_android_home() {
  if (process.env.ANDROID_HOME && fs.existsSync(process.env.ANDROID_HOME)) {
    return process.env.ANDROID_HOME;
  }

  if (
    process.env.ANDROID_SDK_ROOT &&
    fs.existsSync(process.env.ANDROID_SDK_ROOT)
  ) {
    return process.env.ANDROID_SDK_ROOT;
  }

  return fs.existsSync(local_sdk_dir) ? local_sdk_dir : "";
}

const gradle_task = process.argv[2];
const java_home = resolve_java_home();
const android_home = resolve_android_home();

if (!gradle_task) {
  console.error("Usage: node scripts/run-android-gradle.js <gradle-task>");
  process.exit(1);
}

if (!java_home) {
  console.error(
    "Java was not found. Install JDK 21 or place it under .mobile-sdk/jdk21.",
  );
  process.exit(1);
}

if (!android_home) {
  console.error(
    "Android SDK was not found. Install it or place it under .mobile-sdk/android-sdk.",
  );
  process.exit(1);
}

const path_parts = [
  path.join(java_home, "bin"),
  path.join(android_home, "cmdline-tools", "latest", "bin"),
  path.join(android_home, "platform-tools"),
  process.env.PATH || "",
];
const gradle_command =
  process.platform === "win32" ? "gradlew.bat" : "./gradlew";
const result = spawnSync(gradle_command, [gradle_task], {
  cwd: android_dir,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    JAVA_HOME: java_home,
    ANDROID_HOME: android_home,
    ANDROID_SDK_ROOT: android_home,
    PATH: path_parts.join(path.delimiter),
  },
});

process.exit(result.status || 0);
