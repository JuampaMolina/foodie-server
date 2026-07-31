import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: createCategory } = await import("./createCategory.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.post("/test", createCategory(), validate(), (req, res) =>
    res.status(200).json(req.body)
  );
  return app;
};

test("deja pasar una categoría con imagen", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Pizzas", image: "assets/pizza.svg" }),
    });
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.image, "assets/pizza.svg");
  } finally {
    server.close();
  }
});

test("deja pasar una categoría sin imagen", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Pizzas" }),
    });
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("rechaza una categoría sin nombre", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: "assets/pizza.svg" }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
