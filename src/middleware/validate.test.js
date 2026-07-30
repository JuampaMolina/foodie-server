import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { body } = await import("express-validator");
const { default: validate } = await import("./validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.post(
    "/test",
    body("name").notEmpty().withMessage("El nombre es necesario"),
    validate(),
    (req, res) => res.status(200).json({ ok: true })
  );
  return app;
};

test("deja pasar una request válida", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Pizza" }),
  });
  assert.equal(res.status, 200);
  server.close();
});

test("devuelve 400 con el nombre del campo y el mensaje de validación", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const body = await res.json();
  assert.equal(res.status, 400);
  assert.equal(body.message, "[name]: El nombre es necesario");
  server.close();
});
