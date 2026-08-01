import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import jwt from "jsonwebtoken";
import { io as ioClient } from "socket.io-client";

process.env.JWT_SECRET ??= "test-secret";
process.env.MONGO_URI ??= "mongodb://localhost:27017/test";

const { initSocket, notifyNewOrder, notifyOrderStatusChanged, resetSocket } =
  await import("./socket.js");

const ADMIN = { _id: "a1", name: "Admin", role: "admin" };
const USER = { _id: "u1", name: "User", role: "user" };

const sign = (user) => jwt.sign({ user }, process.env.JWT_SECRET);

const startServer = () =>
  new Promise((resolve) => {
    const httpServer = http.createServer();
    initSocket(httpServer);
    httpServer.listen(0, () => resolve(httpServer));
  });

const connect = (port, token) =>
  new Promise((resolve, reject) => {
    const socket = ioClient(`http://127.0.0.1:${port}`, {
      auth: { token },
      reconnection: false,
      forceNew: true,
    });
    socket.on("connect", () => resolve(socket));
    socket.on("connect_error", (error) => reject(error));
  });

const waitForEvent = (socket, event, timeoutMs = 1000) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`timeout esperando "${event}"`)),
      timeoutMs
    );
    socket.once(event, (payload) => {
      clearTimeout(timer);
      resolve(payload);
    });
  });

test("rechaza la conexión sin token", async () => {
  const server = await startServer();
  try {
    const { port } = server.address();
    await assert.rejects(() => connect(port, undefined));
  } finally {
    server.close();
    resetSocket();
  }
});

test("rechaza la conexión con un token inválido", async () => {
  const server = await startServer();
  try {
    const { port } = server.address();
    await assert.rejects(() => connect(port, "token-basura"));
  } finally {
    server.close();
    resetSocket();
  }
});

test("notifyNewOrder sólo llega a los admin conectados", async () => {
  const server = await startServer();
  try {
    const { port } = server.address();
    const adminSocket = await connect(port, sign(ADMIN));
    const userSocket = await connect(port, sign(USER));

    const adminEvent = waitForEvent(adminSocket, "order:new");
    let userReceived = false;
    userSocket.once("order:new", () => {
      userReceived = true;
    });

    notifyNewOrder({ _id: "o1" });
    const payload = await adminEvent;
    // Deja que un posible (e indeseado) evento al usuario normal tenga
    // tiempo de llegar antes de comprobar que no ha pasado.
    await new Promise((resolve) => setTimeout(resolve, 200));

    assert.equal(payload._id, "o1");
    assert.equal(userReceived, false);

    adminSocket.close();
    userSocket.close();
  } finally {
    server.close();
    resetSocket();
  }
});

test("notifyOrderStatusChanged sólo llega al dueño del pedido", async () => {
  const server = await startServer();
  try {
    const { port } = server.address();
    const ownerSocket = await connect(port, sign(USER));
    const otherSocket = await connect(
      port,
      sign({ _id: "u2", name: "Otro", role: "user" })
    );

    const ownerEvent = waitForEvent(ownerSocket, "order:status-changed");
    let otherReceived = false;
    otherSocket.once("order:status-changed", () => {
      otherReceived = true;
    });

    notifyOrderStatusChanged({
      _id: "o1",
      user: { _id: USER._id },
      status: "preparing",
    });
    const payload = await ownerEvent;
    await new Promise((resolve) => setTimeout(resolve, 200));

    assert.equal(payload.status, "preparing");
    assert.equal(otherReceived, false);

    ownerSocket.close();
    otherSocket.close();
  } finally {
    server.close();
    resetSocket();
  }
});
