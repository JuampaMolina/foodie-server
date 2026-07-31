import Order from "./OrderModel.js";
import paginate from "../../utils/paginate.js";

export default (function () {
  const getAll = async (pagination) => {
    return paginate(
      Order,
      Order.find().populate(["user", "items.item"]),
      pagination
    );
  };

  const getOrdersByUserId = async (userId) => {
    const order = await Order.find({ user: userId }).populate([
      "user",
      "items.item",
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
    return order.populate("items.item");
  };

  const updateStatus = async (id, status) => {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate(["user", "items.item"]);
    if (!order) {
      throw new Error("El pedido no existe");
    }
    return order;
  };

  const cancel = async (id, user) => {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("El pedido no existe");
    }

    const isOwner = order.user.toString() === user._id.toString();
    if (!isOwner && user.role !== "admin") {
      throw new Error("No tienes permiso para cancelar este pedido");
    }

    if ((order.status ?? "pending") !== "pending") {
      throw new Error("Solo se pueden cancelar pedidos pendientes");
    }

    order.status = "cancelled";
    await order.save();

    return order.populate(["user", "items.item"]);
  };

  return {
    getAll,
    getOrdersByUserId,
    create,
    updateStatus,
    cancel,
  };
})();
