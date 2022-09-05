import Order from "../../modules/order/OrderModel.js";

const seed = async () => {
  // console.log("Inserting orders");
  await Order.deleteMany({});
};

export default seed;
