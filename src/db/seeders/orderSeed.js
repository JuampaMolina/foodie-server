import Order from "../../modules/order/OrderModel.js";

const USER_ID = "631621f581a0daa0953adc79";

const ITEM = {
  agua: "631622af43187a2f33a283a1",
  cocaCola: "631622af43187a2f33a283a2",
  tiramisu: "631622af43187a2f33a283a3",
  brownie: "631622af43187a2f33a283a4",
  pizzaMargarita: "631622af43187a2f33a283a5",
  pizzaHawaiana: "631622af43187a2f33a283a6",
  espaguetisCarbonara: "631622af43187a2f33a283a7",
  macarronesBolonesa: "631622af43187a2f33a283a8",
  hamburguesaClasica: "631622af43187a2f33a283a9",
  hamburguesaIberica: "631622af43187a2f33a283b1",
  ensaladaCesar: "631622af43187a2f33a283b2",
  ensaladaCasa: "631622af43187a2f33a283b3",
};

const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

const orders = [
  {
    date: daysAgo(0),
    address: "Calle Mayor 1, Madrid",
    status: "pending",
    items: [
      { item: ITEM.pizzaMargarita, quantity: 2 },
      { item: ITEM.cocaCola, quantity: 2 },
    ],
    totalPrice: 20,
  },
  {
    date: daysAgo(1),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.hamburguesaClasica, quantity: 1 },
      { item: ITEM.ensaladaCesar, quantity: 1 },
    ],
    totalPrice: 10,
  },
  {
    date: daysAgo(1),
    address: "Avenida de la Constitución 5, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.pizzaMargarita, quantity: 1 },
      { item: ITEM.agua, quantity: 2 },
    ],
    totalPrice: 12,
  },
  {
    date: daysAgo(2),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.pizzaHawaiana, quantity: 1 },
      { item: ITEM.tiramisu, quantity: 2 },
    ],
    totalPrice: 18,
  },
  {
    date: daysAgo(3),
    address: "Calle Mayor 1, Madrid",
    status: "preparing",
    items: [
      { item: ITEM.hamburguesaClasica, quantity: 2 },
      { item: ITEM.cocaCola, quantity: 2 },
    ],
    totalPrice: 14,
  },
  {
    date: daysAgo(4),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [{ item: ITEM.pizzaMargarita, quantity: 3 }],
    totalPrice: 24,
  },
  {
    date: daysAgo(5),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.espaguetisCarbonara, quantity: 1 },
      { item: ITEM.brownie, quantity: 1 },
    ],
    totalPrice: 11,
  },
  {
    date: daysAgo(6),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [{ item: ITEM.macarronesBolonesa, quantity: 2 }],
    totalPrice: 14,
  },
  {
    date: daysAgo(6),
    address: "Calle Mayor 1, Madrid",
    status: "cancelled",
    items: [{ item: ITEM.pizzaMargarita, quantity: 2 }],
    totalPrice: 16,
  },
  {
    date: daysAgo(7),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.hamburguesaIberica, quantity: 1 },
      { item: ITEM.ensaladaCasa, quantity: 1 },
    ],
    totalPrice: 10,
  },
  {
    date: daysAgo(8),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.pizzaMargarita, quantity: 2 },
      { item: ITEM.hamburguesaClasica, quantity: 1 },
    ],
    totalPrice: 21,
  },
  {
    date: daysAgo(9),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.cocaCola, quantity: 3 },
      { item: ITEM.agua, quantity: 1 },
    ],
    totalPrice: 8,
  },
  {
    date: daysAgo(10),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.pizzaMargarita, quantity: 1 },
      { item: ITEM.tiramisu, quantity: 1 },
    ],
    totalPrice: 12,
  },
  {
    date: daysAgo(12),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [{ item: ITEM.hamburguesaClasica, quantity: 2 }],
    totalPrice: 10,
  },
  {
    date: daysAgo(14),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [{ item: ITEM.ensaladaCesar, quantity: 2 }],
    totalPrice: 10,
  },
  {
    date: daysAgo(16),
    address: "Calle Mayor 1, Madrid",
    status: "cancelled",
    items: [{ item: ITEM.hamburguesaIberica, quantity: 1 }],
    totalPrice: 6,
  },
  {
    date: daysAgo(18),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.pizzaMargarita, quantity: 2 },
      { item: ITEM.brownie, quantity: 2 },
    ],
    totalPrice: 24,
  },
  {
    date: daysAgo(20),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.macarronesBolonesa, quantity: 1 },
      { item: ITEM.cocaCola, quantity: 2 },
    ],
    totalPrice: 11,
  },
  {
    date: daysAgo(25),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [
      { item: ITEM.hamburguesaClasica, quantity: 2 },
      { item: ITEM.pizzaMargarita, quantity: 1 },
    ],
    totalPrice: 18,
  },
  {
    date: daysAgo(27),
    address: "Calle Mayor 1, Madrid",
    status: "delivered",
    items: [{ item: ITEM.pizzaMargarita, quantity: 5 }],
    totalPrice: 40,
  },
].map((order) => ({ ...order, user: USER_ID }));

const seed = async () => {
  console.log("Inserting orders");
  await Order.deleteMany({});
  await Order.insertMany(orders);
};

export default seed;
