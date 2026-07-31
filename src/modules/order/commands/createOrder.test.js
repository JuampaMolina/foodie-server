import { test } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { default: express } = await import("express");
const { default: createOrder } = await import("./createOrder.js");
const { default: validate } = await import("../../../middleware/validate.js");

const listen = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.post("/test", createOrder(), validate(), (req, res) =>
    res.status(200).json({ ok: true })
  );
  return app;
};

const validBody = {
  date: "2026-01-01T00:00:00.000Z",
  totalPrice: 20,
  items: ["item-1"],
  address: "Calle Falsa 123",
};

test("deja pasar un pedido con dirección de entrega", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    assert.equal(res.status, 200);
  } finally {
    server.close();
  }
});

test("rechaza un pedido sin dirección de entrega", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const withoutAddress = { ...validBody };
    delete withoutAddress.address;
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(withoutAddress),
    });
    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(
      body.message,
      "[address]: La dirección de entrega es necesaria"
    );
  } finally {
    server.close();
  }
});

test("rechaza una dirección vacía", async () => {
  const server = await listen(buildApp());
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, address: "   " }),
    });
    assert.equal(res.status, 400);
  } finally {
    server.close();
  }
});
