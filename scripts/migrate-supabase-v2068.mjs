import { createClient } from "@supabase/supabase-js";

const env = (name, fallback = "") =>
  String(process.env[name] || fallback).trim();

const roomSlug = env("ROOM_SLUG", "svetlana-diab");
const migrationEmail = env(
  "SUPABASE_MIGRATION_EMAIL",
  "yasserdiabhassan@gmail.com",
);
const migrationPassword = env("SUPABASE_MIGRATION_PASSWORD", "Wolf&Luna");
const migrationUserKey = env("SUPABASE_MIGRATION_USER_KEY", "diab");
const migrationDisplayName =
  migrationUserKey === "svetlana" ? "Svetlana" : "Diab";
const migrateMedia = env("MIGRATE_MEDIA", "1") !== "0";

const oldSupabaseUrl = env(
  "OLD_SUPABASE_URL",
  "https://raggjtzizfcfoaxvkgov.supabase.co",
);
const oldSupabaseAnonKey = env(
  "OLD_SUPABASE_ANON_KEY",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyYWdnanR6aXpmY2ZvYXh2a2dvdiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc4NjQ4MDQwLCJleHAiOjIwOTQyMjQwNDB9.qsNj79Ki4YcqzLQleVYEyIXj0ZeMaM-k72skTV2YeEs",
);
const newSupabaseUrl = env(
  "NEW_SUPABASE_URL",
  "https://uwxjtarrgkznkollwqko.supabase.co",
);
const newSupabaseAnonKey = env(
  "NEW_SUPABASE_ANON_KEY",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1d3hqdGFycmdrem5rb2xsd3FrbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc5NTQ3MDcxLCJleHAiOjIwOTUxMjMwNzF9.49VnXStaT5zbXOBrWMMzOBsGZItludpv-G3scEAkf18",
);

const oldSharedMusicUrl = env("OLD_SHARED_MUSIC_SUPABASE_URL", oldSupabaseUrl);
const oldSharedMusicAnonKey = env(
  "OLD_SHARED_MUSIC_SUPABASE_ANON_KEY",
  oldSupabaseAnonKey,
);

const appMediaBucket = "app-media";
const sharedMusicBucket = "shared-music";

function assertConfig(name, value) {
  if (!value) {
    throw new Error(`${name} is required`);
  }
}

function log(message) {
  console.log(`[v2.068 migration] ${message}`);
}

function createSupabaseClient(url, key) {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

async function signIn(client, label) {
  const { data, error } = await client.auth.signInWithPassword({
    email: migrationEmail,
    password: migrationPassword,
  });

  if (error || !data.user) {
    throw new Error(
      `${label} sign-in failed: ${error?.message || "missing user"}`,
    );
  }

  return data.user;
}

async function ensureNewProfile(client, user) {
  const { error } = await client.from("app_profiles").upsert(
    {
      id: user.id,
      user_key: migrationUserKey,
      display_name: migrationDisplayName,
      room_slug: roomSlug,
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`Could not create new app profile: ${error.message}`);
  }
}

function isMissingTableError(error) {
  const message = String(error?.message || "").toLowerCase();

  return (
    error?.code === "42P01" ||
    message.includes("could not find the table") ||
    message.includes("does not exist")
  );
}

async function fetchRows(
  client,
  tableName,
  { roomScoped = true, orderBy = "created_at" } = {},
) {
  const pageSize = 1000;
  const rows = [];

  for (let from = 0; ; from += pageSize) {
    let query = client
      .from(tableName)
      .select("*")
      .range(from, from + pageSize - 1);

    if (roomScoped) {
      query = query.eq("room_slug", roomSlug);
    }

    if (orderBy) {
      query = query.order(orderBy, { ascending: true });
    }

    const { data, error } = await query;

    if (error) {
      if (isMissingTableError(error)) {
        log(
          `${tableName}: skipped because table does not exist in source project`,
        );
        return [];
      }

      throw new Error(`${tableName} read failed: ${error.message}`);
    }

    const page = Array.isArray(data) ? data : [];
    rows.push(...page);

    if (page.length < pageSize) {
      break;
    }
  }

  return rows;
}

async function upsertRows(client, tableName, rows, onConflict) {
  if (rows.length === 0) {
    log(`${tableName}: nothing to copy`);
    return;
  }

  for (let index = 0; index < rows.length; index += 100) {
    const chunk = rows.slice(index, index + 100);
    const { error } = await client
      .from(tableName)
      .upsert(chunk, { onConflict });

    if (error) {
      throw new Error(`${tableName} write failed: ${error.message}`);
    }
  }

  log(`${tableName}: copied ${rows.length} row(s)`);
}

function isNewProjectUrl(value) {
  return String(value || "").includes(new URL(newSupabaseUrl).host);
}

function shouldCopyMediaSource(value) {
  const source = String(value || "");
  return Boolean(
    source &&
    migrateMedia &&
    (source.startsWith("data:") || !isNewProjectUrl(source)),
  );
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/s);

  if (!match) {
    return null;
  }

  const mimeType = match[1] || "application/octet-stream";
  const isBase64 = Boolean(match[2]);
  const dataPart = match[3] || "";
  const bytes = isBase64
    ? Buffer.from(dataPart, "base64")
    : Buffer.from(decodeURIComponent(dataPart), "utf8");

  return { bytes, mimeType };
}

function extensionFromMimeType(mimeType, fallback = "bin") {
  const normalized = String(mimeType || "").toLowerCase();
  const map = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/mp4": "m4a",
    "audio/m4a": "m4a",
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
  };

  return map[normalized] || fallback;
}

function sanitizePathSegment(value, fallback = "file") {
  const safe = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return safe || fallback;
}

async function readMediaSource(source, fallbackMimeType) {
  if (!source) {
    return null;
  }

  if (String(source).startsWith("data:")) {
    return parseDataUrl(source);
  }

  const response = await fetch(source);

  if (!response.ok) {
    throw new Error(`download failed ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const mimeType =
    response.headers.get("content-type") ||
    fallbackMimeType ||
    "application/octet-stream";
  return { bytes, mimeType };
}

async function copyMediaToNewStorage({
  targetClient,
  bucket,
  source,
  storagePath,
  fallbackMimeType = "application/octet-stream",
  label = "media",
}) {
  if (!shouldCopyMediaSource(source)) {
    return null;
  }

  try {
    const media = await readMediaSource(source, fallbackMimeType);

    if (!media?.bytes?.length) {
      return null;
    }

    const { error } = await targetClient.storage
      .from(bucket)
      .upload(storagePath, media.bytes, {
        upsert: true,
        contentType: media.mimeType || fallbackMimeType,
      });

    if (error) {
      throw error;
    }

    const { data } = targetClient.storage
      .from(bucket)
      .getPublicUrl(storagePath);
    return {
      bucket,
      storage_path: storagePath,
      public_url: data?.publicUrl || "",
      mime_type: media.mimeType || fallbackMimeType,
      size_bytes: media.bytes.length,
    };
  } catch (error) {
    log(`${label}: media copy skipped (${error.message})`);
    return null;
  }
}

function parseAttachments(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function migrateMemoryRow(row, targetClient) {
  const imageData = String(row.image_data || "");

  if (!shouldCopyMediaSource(imageData)) {
    return row;
  }

  const copied = await copyMediaToNewStorage({
    targetClient,
    bucket: appMediaBucket,
    source: imageData,
    storagePath: `${roomSlug}/memory-gallery/${sanitizePathSegment(row.id)}.${extensionFromMimeType("image/jpeg", "jpg")}`,
    fallbackMimeType: "image/jpeg",
    label: `memory ${row.id}`,
  });

  return copied?.public_url ? { ...row, image_data: copied.public_url } : row;
}

async function migrateLiveMessageRow(row, targetClient) {
  const attachments = parseAttachments(row.attachments);
  let changed = false;

  const nextAttachments = [];

  for (const [index, attachment] of attachments.entries()) {
    if (!attachment || attachment.kind !== "file") {
      nextAttachments.push(attachment);
      continue;
    }

    const source = String(attachment.data_url || attachment.public_url || "");
    const mimeType = String(attachment.type || "application/octet-stream");
    const extension = extensionFromMimeType(mimeType, "bin");
    const safeName = sanitizePathSegment(
      attachment.name || `file-${index}.${extension}`,
    );
    const storagePath =
      attachment.storage_path &&
      String(attachment.storage_path).startsWith(`${roomSlug}/`)
        ? String(attachment.storage_path)
        : `${roomSlug}/shared-files/${sanitizePathSegment(row.id)}-${index}-${safeName}`;
    const copied = await copyMediaToNewStorage({
      targetClient,
      bucket: appMediaBucket,
      source,
      storagePath,
      fallbackMimeType: mimeType,
      label: `message ${row.id} attachment ${index + 1}`,
    });

    if (copied?.public_url) {
      nextAttachments.push({
        ...attachment,
        bucket: copied.bucket,
        storage_path: copied.storage_path,
        public_url: copied.public_url,
        data_url: "",
      });
      changed = true;
    } else {
      nextAttachments.push({
        ...attachment,
        data_url:
          attachment.data_url && migrateMedia ? "" : attachment.data_url,
      });
      changed = changed || Boolean(attachment.data_url && migrateMedia);
    }
  }

  return changed ? { ...row, attachments: nextAttachments } : row;
}

async function migrateMediaFileRow(
  row,
  targetClient,
  sourceClient,
  bucketFallback = appMediaBucket,
) {
  const sourceBucket = String(row.storage_bucket || bucketFallback);
  const sourcePath = String(row.storage_path || "");
  const publicUrl =
    String(row.public_url || "") ||
    (sourcePath
      ? sourceClient.storage.from(sourceBucket).getPublicUrl(sourcePath).data
          ?.publicUrl || ""
      : "");
  const storagePath =
    sourcePath ||
    `${roomSlug}/${sanitizePathSegment(row.category || "shared-files")}/${sanitizePathSegment(row.id)}`;
  const copied = await copyMediaToNewStorage({
    targetClient,
    bucket: bucketFallback,
    source: publicUrl,
    storagePath,
    fallbackMimeType: String(row.mime_type || "application/octet-stream"),
    label: `media file ${row.id}`,
  });

  if (!copied?.public_url) {
    return row;
  }

  return {
    ...row,
    storage_bucket: copied.bucket,
    storage_path: copied.storage_path,
    public_url: copied.public_url,
    mime_type: row.mime_type || copied.mime_type,
    size_bytes: Number(row.size_bytes || copied.size_bytes || 0),
    updated_at: new Date().toISOString(),
  };
}

async function copyTable({
  sourceClient,
  targetClient,
  tableName,
  onConflict,
  roomScoped,
  orderBy,
  transform,
}) {
  const rows = await fetchRows(sourceClient, tableName, {
    roomScoped,
    orderBy,
  });
  const nextRows = [];

  for (const row of rows) {
    nextRows.push(transform ? await transform(row, targetClient) : row);
  }

  await upsertRows(targetClient, tableName, nextRows, onConflict);
}

async function migrateSharedMusic(oldMusicClient, targetClient) {
  let rows = [];

  try {
    rows = await fetchRows(oldMusicClient, "shared_music_files", {
      roomScoped: true,
      orderBy: "created_at",
    });
  } catch (error) {
    log(`shared_music_files: skipped (${error.message})`);
    return;
  }

  const nextRows = [];

  for (const row of rows) {
    nextRows.push(
      await migrateMediaFileRow(
        row,
        targetClient,
        oldMusicClient,
        sharedMusicBucket,
      ),
    );
  }

  await upsertRows(targetClient, "shared_music_files", nextRows, "id");
}

async function main() {
  assertConfig("OLD_SUPABASE_URL", oldSupabaseUrl);
  assertConfig("OLD_SUPABASE_ANON_KEY", oldSupabaseAnonKey);
  assertConfig("NEW_SUPABASE_URL", newSupabaseUrl);
  assertConfig("NEW_SUPABASE_ANON_KEY", newSupabaseAnonKey);
  assertConfig("SUPABASE_MIGRATION_EMAIL", migrationEmail);
  assertConfig("SUPABASE_MIGRATION_PASSWORD", migrationPassword);

  const oldClient = createSupabaseClient(oldSupabaseUrl, oldSupabaseAnonKey);
  const newClient = createSupabaseClient(newSupabaseUrl, newSupabaseAnonKey);
  const oldMusicClient = createSupabaseClient(
    oldSharedMusicUrl,
    oldSharedMusicAnonKey,
  );

  log(`signing in as ${migrationEmail}`);
  await signIn(oldClient, "old project");
  const newUser = await signIn(newClient, "new project");
  await ensureNewProfile(newClient, newUser);

  log(`media copy is ${migrateMedia ? "on" : "off"}`);
  await copyTable({
    sourceClient: oldClient,
    targetClient: newClient,
    tableName: "app_memories",
    onConflict: "id",
    roomScoped: true,
    orderBy: "created_at",
    transform: migrateMemoryRow,
  });
  await copyTable({
    sourceClient: oldClient,
    targetClient: newClient,
    tableName: "app_events",
    onConflict: "id",
    roomScoped: true,
    orderBy: "created_at",
  });
  await copyTable({
    sourceClient: oldClient,
    targetClient: newClient,
    tableName: "app_cycle_states",
    onConflict: "room_slug",
    roomScoped: true,
    orderBy: null,
  });
  await copyTable({
    sourceClient: oldClient,
    targetClient: newClient,
    tableName: "app_live_messages",
    onConflict: "id",
    roomScoped: true,
    orderBy: "created_at",
    transform: migrateLiveMessageRow,
  });
  await copyTable({
    sourceClient: oldClient,
    targetClient: newClient,
    tableName: "app_media_files",
    onConflict: "id",
    roomScoped: true,
    orderBy: "created_at",
    transform: (row, targetClient) =>
      migrateMediaFileRow(row, targetClient, oldClient, appMediaBucket),
  });
  await migrateSharedMusic(oldMusicClient, newClient);

  log(
    "done. app_notification_events was intentionally not migrated, so old push notifications cannot replay.",
  );
}

main().catch((error) => {
  console.error(`[v2.068 migration] failed: ${error.message}`);
  process.exitCode = 1;
});
