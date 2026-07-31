import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: updateUserRole } = await import("./updateUserRole.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.put("/test/:id", updateUserRole(), validate(), (req, res) =>
    res.status(200).json({ ok: true })
  );
  return app;
};

const validId = "507f1f77bcf86cd799439011";

test("deja pasar un cambio de rol a admin", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test/${validId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("rechaza un rol no válido", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test/${validId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "superadmin" }),
    });
    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.message, "[role]: Rol no válido");
  } finally {
    server.close();
  }
});

test("rechaza un id de usuario no válido", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test/not-an-id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
