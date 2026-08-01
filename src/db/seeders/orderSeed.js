import Order from "../../modules/order/OrderModel.js";
import { items } from "./itemSeed.js";
import { users } from "./userSeed.js";

const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

// PRNG determinista (mulberry32) para que "npm run seed" genere siempre
// exactamente los mismos 150 pedidos. Nada de Math.random(): así el
// resultado es reproducible y revisable en el diff si algún día cambia la
// semilla o el número de pedidos.
const SEED = 20260801;
function mulberry32(seed) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
const randInt = (min, max) => min + Math.floor(rand() * (max - min + 1));
const pick = (array) => array[randInt(0, array.length - 1)];

// Sólo clientes (role "user"); los admin no hacen pedidos.
const customers = users.filter((user) => user.role === "user");

const ADDRESSES = [
  "Calle Mayor 12, 3ºB, Madrid",
  "Avenida de la Constitución 5, Madrid",
  "Calle Alcalá 210, 1ºA, Madrid",
  "Plaza del Sol 7, Madrid",
  "Calle Gran Vía 45, 5ºC, Madrid",
  "Paseo de la Castellana 89, Madrid",
];
// Cada cliente pide casi siempre desde la misma dirección, con alguna
// excepción ocasional (pedir desde el trabajo, por ejemplo).
const homeAddressByUser = new Map(
  customers.map((customer, index) => [
    customer._id.toString(),
    ADDRESSES[index % ADDRESSES.length],
  ])
);

const ORDER_COUNT = 150;
const MAX_DAYS_BACK = 90;

function pickItems() {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const count = randInt(1, 4);
  return shuffled.slice(0, count).map((item) => ({
    item: item._id,
    quantity: randInt(1, 3),
  }));
}

function pickStatus(dayOffset) {
  if (dayOffset === 0) {
    // Pedidos de hoy: casi todos siguen activos, para que el panel de admin
    // tenga cola que gestionar nada más sembrar, sin esperar a que alguien
    // pida algo a mano.
    return pick([
      "pending",
      "pending",
      "pending",
      "preparing",
      "preparing",
      "delivered",
    ]);
  }
  if (dayOffset <= 2) {
    return pick([
      "preparing",
      "preparing",
      "preparing",
      "delivered",
      "delivered",
      "cancelled",
    ]);
  }
  // Pedidos más antiguos: prácticamente todos ya se entregaron.
  return pick([
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "cancelled",
  ]);
}

function buildOrder() {
  // Sesgado hacia días recientes (exponente > 1), para que las ventanas de
  // 7 y 30 días del dashboard de métricas tengan volumen de sobra, sin dejar
  // vacía la ventana de 90 días.
  const dayOffset = Math.floor(MAX_DAYS_BACK * Math.pow(rand(), 1.6));
  const customer = pick(customers);
  const home = homeAddressByUser.get(customer._id.toString());
  const address = rand() < 0.15 ? pick(ADDRESSES) : home;
  const orderItems = pickItems();
  const totalPrice = orderItems.reduce((sum, { item, quantity }) => {
    const found = items.find((candidate) => candidate._id.equals(item));
    return sum + found.price * quantity;
  }, 0);

  return {
    date: daysAgo(dayOffset),
    address,
    status: pickStatus(dayOffset),
    user: customer._id,
    items: orderItems,
    totalPrice,
  };
}

const orders = Array.from({ length: ORDER_COUNT }, buildOrder);

const seed = async () => {
  console.log("Inserting orders");
  await Order.deleteMany({});
  await Order.insertMany(orders);
};

export default seed;
export { orders };
