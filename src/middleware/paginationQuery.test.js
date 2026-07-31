import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { matchedData } = await import("express-validator");
const { default: paginationQuery } = await import("./paginationQuery.js");
const { default: validate } = await import("./validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  // Reads req.query directly for the response are strings under Express 5:
  // matchedData(req) is what carries the sanitized/coerced values, same as
  // the real controllers (see ItemController.getAll / OrderController.getAll).
  app.get("/test", paginationQuery(), validate(), (req, res) => {
    const { page, limit } = matchedData(req);
    res.status(200).json({ page, limit });
  });
  return app;
};

test("sin page ni limit, deja pasar", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`);
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("con page y limit válidos, los convierte a número", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?page=2&limit=5`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(body, { page: 2, limit: 5 });
  } finally {
    server.close();
  }
});

test("rechaza page no numérico", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?page=abc`);
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});

test("rechaza limit fuera de rango", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?limit=200`);
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
