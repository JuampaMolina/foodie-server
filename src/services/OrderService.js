import Order from "../models/Order.js";

export default (function () {
  const getAll = async () => {
    try {
      const orders = await Order.find().populate(["user", "items"]);
      return orders;
    } catch (error) {
      throw error;
    }
  };

  const getOrdersByUserId = async (userId) => {
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
  };

  const create = async (data) => {
    try {
      const order = await Order.create(data);
      if (!order) {
        throw new Error("No se ha podido realizar el pedido");
      }
      return order.populate("items");
    } catch (error) {
      throw error;
    }
  };

  return {
    getAll,
    getOrdersByUserId,
    create,
  };
})();
