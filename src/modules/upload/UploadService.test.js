import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import UploadService from "./UploadService.js";

const expectedSignature = (params, apiSecret) => {
  const toSign = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");
};

test("signParams calcula el mismo hash SHA1 que Cloudinary espera", () => {
  const signature = UploadService.signParams(
    { timestamp: 1315060510, folder: "foodie/categories" },
    "abcd"
  );

  assert.equal(
    signature,
    expectedSignature({ timestamp: 1315060510, folder: "foodie/categories" }, "abcd")
  );
});

test("getUploadSignature devuelve una firma válida junto con la config pública", () => {
  const result = UploadService.getUploadSignature({
    cloudName: "demo-cloud",
    apiKey: "123456",
    apiSecret: "abcd",
  });

  assert.equal(result.cloudName, "demo-cloud");
  assert.equal(result.apiKey, "123456");
  assert.equal(result.folder, "foodie/categories");
  assert.equal(typeof result.timestamp, "number");
  assert.match(result.signature, /^[a-f0-9]{40}$/);
  assert.equal(
    result.signature,
    expectedSignature(
      { timestamp: result.timestamp, folder: result.folder },
      "abcd"
    )
  );
});

test("getUploadSignature lanza si falta cualquier credencial", () => {
  assert.throws(() =>
    UploadService.getUploadSignature({ apiKey: "k", apiSecret: "s" })
  );
  assert.throws(() =>
    UploadService.getUploadSignature({ cloudName: "c", apiSecret: "s" })
  );
  assert.throws(() =>
    UploadService.getUploadSignature({ cloudName: "c", apiKey: "k" })
  );
});
