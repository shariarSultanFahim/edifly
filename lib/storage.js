/**
 * Encode card data into a URL-safe base64 string.
 * This avoids any server-side file storage, making it
 * fully compatible with Vercel's read-only filesystem.
 */

function toBase64Url(input) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf-8").toString("base64url");
  }

  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "base64url").toString("utf-8");
  }

  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded =
    normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeCardData(card) {
  const json = JSON.stringify(card);
  return toBase64Url(json);
}

export function decodeCardData(encoded) {
  try {
    const json = fromBase64Url(encoded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
