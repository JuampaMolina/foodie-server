import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: resetPassword } = await import("./resetPassword.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.post("/test", resetPassword(), validate(), (req, res) =>
    res.status(200).json({ ok: true })
  );
  return app;
};

test("deja pasar un token y contraseña válidos", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "abc123", password: "1234" }),
    });
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("rechaza sin token", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "1234" }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});

test("rechaza una contraseña demasiado corta", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "abc123", password: "12" }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
