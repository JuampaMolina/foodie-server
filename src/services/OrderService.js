import Order from "../models/Order.js";

export async function getAll() {
  try {
    const orders = await Order.find().populate(["user", "items"]);
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByUserId(userId) {
  try {
    const order = await Order.find({ user: userId }).populate([
      "user",
      "items",
    ]);
    if (!order) {
      throw new Error("Usuario no encontrado");
    }
    return order;
  } catch (error) {
    throw error;
  }
}

export async function create(data) {
  try {
    const order = await Order.create(data);
    if (!order) {
      throw new Error("No se ha podido realizar el pedido");
    }
    return order.populate("items");
  } catch (error) {
    throw error;
  }
}
