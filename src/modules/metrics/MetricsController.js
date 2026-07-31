import { matchedData } from "express-validator";
import MetricsService from "./MetricsService.js";

export default (function () {
  const getSalesByDay = async (req, res) => {
    const { days } = matchedData(req);
    try {
      const salesByDay = await MetricsService.getSalesByDay(days);
      return res.status(200).json(salesByDay);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  const getTopItems = async (req, res) => {
    const { limit } = matchedData(req);
    try {
      const topItems = await MetricsService.getTopItems(limit);
      return res.status(200).json(topItems);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

  return {
    getSalesByDay,
    getTopItems,
  };
})();
