import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { matchedData } = await import("express-validator");
const { default: topItemsQuery } = await import("./topItemsQuery.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.get("/test", topItemsQuery(), validate(), (req, res) => {
    const { limit } = matchedData(req);
    res.status(200).json({ limit });
  });
  return app;
};

test("sin limit, deja pasar", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`);
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("con limit válido, lo convierte a número", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?limit=3`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(body, { limit: 3 });
  } finally {
    server.close();
  }
});

test("rechaza limit fuera de rango", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?limit=50`);
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
