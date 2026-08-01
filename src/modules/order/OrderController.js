import { matchedData } from "express-validator";
import OrderService from "./OrderService.js";
import {
  notifyNewOrder,
  notifyOrderStatusChanged,
} from "../../realtime/socket.js";

export default (function () {
  const getAll = async (req, res) => {
    const { page, limit } = matchedData(req);
    try {
      const orders = await OrderService.getAll({ page, limit });
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
      notifyNewOrder(order);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const order = await OrderService.updateStatus(id, status);
      notifyOrderStatusChanged(order);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const cancel = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await OrderService.cancel(id, req.user);
      notifyOrderStatusChanged(order);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    getAll,
    getOrdersByUserId,
    create,
    updateStatus,
    cancel,
  };
})();
