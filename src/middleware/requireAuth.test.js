import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: jwt } = await import("jsonwebtoken");
const { default: requireAuth } = await import("./requireAuth.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.get("/protected", requireAuth(), (req, res) =>
    res.status(200).json({ user: req.user })
  );
  return app;
};

test("deja pasar con un token válido y añade req.user", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const token = jwt.sign({ user: { role: "user" } }, process.env.JWT_SECRET);
  const res = await fetch(`http://127.0.0.1:${port}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.user.role, "user");
  server.close();
});

test("rechaza sin cabecera authorization", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/protected`);
  assert.equal(res.status, 401);
  server.close();
});

test("rechaza un token firmado con otro secreto", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const token = jwt.sign({ user: { role: "user" } }, "otro-secreto");
  const res = await fetch(`http://127.0.0.1:${port}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(res.status, 401);
  server.close();
});
