import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import env from "../config/env.js";
import logger from "../config/logger.js";

// Mismo esquema de token que requireAuth.js: { user } firmado con
// JWT_SECRET, donde user ya trae _id y role (login lo mete tal cual en el
// payload). No hay un endpoint de refresco de socket: si el token caduca a
// mitad de la conexión, el cliente simplemente deja de recibir eventos
// hasta que reconecte con un token nuevo.
const authenticate = (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Falta el token"));
  }
  try {
    const { user } = jwt.verify(token, env.JWT_SECRET);
    if (!user?._id) {
      return next(new Error("Token no válido"));
    }
    socket.user = user;
    next();
  } catch {
    next(new Error("Token no válido"));
  }
};

let io = null;

/**
 * Cada socket se une a una sala propia ("user:<id>") para recibir sus
 * propias notificaciones, y los admin además a "admins" para las de
 * pedidos nuevos. Así no hace falta llevar un registro manual de qué
 * socket pertenece a quién: basta con emitir a la sala.
 */
export const initSocket = (httpServer) => {
  io = new Server(httpServer, { cors: { origin: "*" } });

  io.use(authenticate);

  io.on("connection", (socket) => {
    socket.join(`user:${socket.user._id}`);
    if (socket.user.role === "admin") {
      socket.join("admins");
    }
    logger.info(
      { userId: socket.user._id, role: socket.user.role },
      "Cliente conectado por WebSocket"
    );
  });

  return io;
};

export const notifyNewOrder = (order) => {
  io?.to("admins").emit("order:new", order);
};

export const notifyOrderStatusChanged = (order) => {
  const userId = order.user?._id ?? order.user;
  io?.to(`user:${userId}`).emit("order:status-changed", order);
};

// Sólo para tests: dejar el módulo listo para un próximo initSocket().
export const resetSocket = () => {
  io = null;
};
