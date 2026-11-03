import { assert } from "chai";
import {
  buildAtlasSetUrl,
  encryptDoiSet,
  toBase64Url,
} from "../../src/utils/atlasSet";

const fromBase64Url = (value: string) =>
  Uint8Array.from(Buffer.from(value, "base64url"));

describe("atlasSet", function () {
  it("encrypts a set the way the Atlas decrypts it", async function () {
    const dois = ["10.1037/xge0001132", "10.1016/j.jesp.2015.10.012"];
    const { key, iv, data } = await encryptDoiSet(dois, globalThis);

    // The Atlas rejects any key that does not match this pattern.
    assert.match(key, /^[A-Za-z0-9_-]{43}$/);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      fromBase64Url(key),
      "AES-GCM",
      false,
      ["decrypt"],
    );
    const plain = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: fromBase64Url(iv),
        additionalData: new TextEncoder().encode("flora-doi-set:v2"),
      },
      cryptoKey,
      fromBase64Url(data),
    );
    const decoded = JSON.parse(new TextDecoder().decode(plain));

    assert.deepEqual(decoded.dois, dois);
    assert.isString(decoded.created);
  });

  it("uses a new key and iv for every set", async function () {
    const first = await encryptDoiSet(["10.1/a"], globalThis);
    const second = await encryptDoiSet(["10.1/a"], globalThis);
    assert.notEqual(first.key, second.key);
    assert.notEqual(first.iv, second.iv);
  });

  it("encodes large input as unpadded base64url", function () {
    const bytes = new Uint8Array(300_000).fill(251);
    const encoded = toBase64Url(bytes, globalThis);
    assert.match(encoded, /^[A-Za-z0-9_-]+$/);
    assert.deepEqual(fromBase64Url(encoded), bytes);
  });

  it("keeps the key in the URL fragment, never the query", function () {
    const url = new URL(buildAtlasSetUrl("ab12cd34", "secret-key"));
    assert.equal(url.searchParams.get("set"), "ab12cd34");
    assert.equal(url.hash, "#k=secret-key");
    assert.notInclude(url.search, "secret-key");
  });
});
