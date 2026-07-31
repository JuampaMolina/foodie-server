import Order from "../order/OrderModel.js";

const DEFAULT_DAYS = 30;
const DEFAULT_TOP_ITEMS_LIMIT = 5;

export default (function () {
  const getSalesByDay = async (days = DEFAULT_DAYS) => {
    const since = new Date();
    since.setDate(since.getDate() - days);

    return Order.aggregate([
      { $match: { status: { $ne: "cancelled" }, date: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, day: "$_id", revenue: 1, orders: 1 } },
    ]);
  };

  const getTopItems = async (limit = DEFAULT_TOP_ITEMS_LIMIT) => {
    return Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.item",
          quantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "item",
        },
      },
      { $unwind: "$item" },
      {
        $project: { _id: 0, itemId: "$_id", name: "$item.name", quantity: 1 },
      },
    ]);
  };

  return {
    getSalesByDay,
    getTopItems,
  };
})();
