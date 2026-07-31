import Order from "./OrderModel.js";
import paginate from "../../utils/paginate.js";

export default (function () {
  const getAll = async (pagination) => {
    return paginate(
      Order,
      Order.find().populate(["user", "items"]),
      pagination
    );
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
