/**
 * Encrypted DOI sets for "Open in FLoRA Atlas".
 *
 * The list is encrypted here with a new random key for every link, and the API
 * stores only the ciphertext for 30 days. The key travels in the URL fragment
 * (#k=), which browsers never send to a server, and the Atlas decrypts the list
 * in the browser. So neither the API nor forrt.org can read a library's DOIs,
 * but anyone holding the full link can.
 */

export const ATLAS_URL = "https://forrt.org/flora-replication-atlas/";
const SETS_URL = "https://rep-api.forrt.org/v1/sets";
// Must match the Atlas, which passes the same bytes as AES-GCM additional data.
const SET_FORMAT = "flora-doi-set:v2";

/** Globals to use: the plugin sandbox has no crypto, so callers pass a window. */
export type CryptoEnv = Pick<
  typeof globalThis,
  "crypto" | "btoa" | "TextEncoder"
>;

export function toBase64Url(bytes: Uint8Array, env: CryptoEnv): string {
  // Chunked: String.fromCharCode(...bytes) overflows the stack on large lists.
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return env
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function encryptDoiSet(
  dois: string[],
  env: CryptoEnv,
): Promise<{ key: string; iv: string; data: string }> {
  const keyBytes = env.crypto.getRandomValues(new Uint8Array(32));
  const ivBytes = env.crypto.getRandomValues(new Uint8Array(12));
  const encoder = new env.TextEncoder();

  const cryptoKey = await env.crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    false,
    ["encrypt"],
  );
  const ciphertext = await env.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ivBytes,
      additionalData: encoder.encode(SET_FORMAT),
    },
    cryptoKey,
    encoder.encode(JSON.stringify({ dois, created: new Date().toISOString() })),
  );

  return {
    key: toBase64Url(keyBytes, env),
    iv: toBase64Url(ivBytes, env),
    data: toBase64Url(new Uint8Array(ciphertext), env),
  };
}

export function buildAtlasSetUrl(id: string, key: string): string {
  return `${ATLAS_URL}?set=${id}#k=${key}`;
}

/** Store the DOIs as an encrypted set and return the Atlas link to them. */
export async function createAtlasSetUrl(
  dois: string[],
  env: CryptoEnv,
): Promise<string> {
  const { key, iv, data } = await encryptDoiSet(dois, env);
  const response = await Zotero.HTTP.request("POST", SETS_URL, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, iv }),
  });

  const id = JSON.parse(response.responseText ?? "").id;
  if (typeof id !== "string" || !/^[0-9a-f]{8}$/.test(id)) {
    throw new Error(`Unexpected set id from the API: ${id}`);
  }
  return buildAtlasSetUrl(id, key);
}
