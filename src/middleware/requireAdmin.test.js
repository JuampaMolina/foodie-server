import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: jwt } = await import("jsonwebtoken");
const { default: requireAdmin } = await import("./requireAdmin.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.get("/admin", requireAdmin(), (req, res) =>
    res.status(200).json({ ok: true })
  );
  return app;
};

test("deja pasar a un usuario con rol admin", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const token = jwt.sign({ user: { role: "admin" } }, process.env.JWT_SECRET);
  const res = await fetch(`http://127.0.0.1:${port}/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(res.status, 200);
  server.close();
});

test("rechaza a un usuario sin rol admin", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const token = jwt.sign({ user: { role: "user" } }, process.env.JWT_SECRET);
  const res = await fetch(`http://127.0.0.1:${port}/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(res.status, 401);
  server.close();
});
