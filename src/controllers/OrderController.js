import * as OrderService from "../services/OrderService.js";

export async function getAll(req, res, next) {
  try {
    const orders = await OrderService.getAll();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export async function getOrdersByUserId(req, res, next) {
  const { id } = req.params;
  try {
    const order = await OrderService.getOrdersByUserId(id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(404).json({ status: 404, message: error.message });
  }
}

export async function create(req, res, next) {
  const data = req.body;
  try {
    const order = await OrderService.create(data);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}
