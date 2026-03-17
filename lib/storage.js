/**
 * Encode card data into a URL-safe base64 string.
 * This avoids any server-side file storage, making it
 * fully compatible with Vercel's read-only filesystem.
 */

export function encodeCardData(card) {
  const json = JSON.stringify(card);
  // Use btoa-compatible encoding (works in both browser and edge runtime)
  const base64 = Buffer.from(json, "utf-8").toString("base64url");
  return base64;
}

export function decodeCardData(encoded) {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}
