import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: routes } = await import("./app-routes.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  routes(app);
  return app;
};

test("GET /health responde 503 y degraded sin conexión a Mongo", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/health`);
  const body = await res.json();

  assert.equal(res.status, 503);
  assert.equal(body.status, "degraded");
  assert.equal(body.mongo, "disconnected");
  assert.equal(typeof body.uptime, "number");
  server.close();
});

test("GET /uploads/signature exige admin, sin llegar a Cloudinary", async () => {
  const server = await listen(buildApp());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/uploads/signature`);

  assert.equal(res.status, 401);
  server.close();
});
