import OrderService from "./OrderService.js";

export default (function () {
  const getAll = async (req, res) => {
    try {
      const orders = await OrderService.getAll();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const getOrdersByUserId = async (req, res) => {
    const { id } = req.params;
    try {
      const orders = await OrderService.getOrdersByUserId(id);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  };

  const create = async (req, res) => {
    const data = req.body;
    data.user = req.user._id;
    try {
      const order = await OrderService.create(data);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    getAll,
    getOrdersByUserId,
    create,
  };
})();
