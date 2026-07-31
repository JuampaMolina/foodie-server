import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { matchedData } = await import("express-validator");
const { default: salesByDayQuery } = await import("./salesByDayQuery.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.get("/test", salesByDayQuery(), validate(), (req, res) => {
    const { days } = matchedData(req);
    res.status(200).json({ days });
  });
  return app;
};

test("sin days, deja pasar", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`);
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("con days válido, lo convierte a número", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?days=7`);
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(body, { days: 7 });
  } finally {
    server.close();
  }
});

test("rechaza days fuera de rango", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test?days=400`);
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
