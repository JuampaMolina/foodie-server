import Order from "./OrderModel.js";

export default (function () {
  const getAll = async () => {
    const orders = await Order.find().populate(["user", "items"]);
    return orders;
  };

  const getOrdersByUserId = async (userId) => {
    const order = await Order.find({ user: userId }).populate([
      "user",
      "items",
    ]);
    if (!order) {
      throw new Error("Usuario no encontrado");
    }
    return order;
  };

  const create = async (data) => {
    const order = await Order.create(data);
    if (!order) {
      throw new Error("No se ha podido realizar el pedido");
    }
    return order.populate("items");
  };

  const updateStatus = async (id, status) => {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate(["user", "items"]);
    if (!order) {
      throw new Error("El pedido no existe");
    }
    return order;
  };

  return {
    getAll,
    getOrdersByUserId,
    create,
    updateStatus,
  };
})();
