import Item from "../../modules/item/ItemModel.js";

const items = [
  {
    _id: "631622af43187a2f33a283a1",
    name: "Agua",
    description: "Botella de agua 50cl",
    price: 2,
    category: "63127b52d34bf875c3c3d4c1",
  },
  {
    _id: "631622af43187a2f33a283a2",
    name: "Coca-Cola",
    description: "Lata de Coca-Cola 33cl",
    price: 2,
    category: "63127b52d34bf875c3c3d4c1",
  },
  {
    _id: "631622af43187a2f33a283a3",
    name: "Tiramisú",
    description: "Postre tradicional italiano con sabor a café",
    price: 4,
    category: "63127b52d34bf875c3c3d4c2",
  },
  {
    _id: "631622af43187a2f33a283a4",
    name: "Brownie",
    description: "Bizcocho de chocolate y nueces",
    price: 4,
    category: "63127b52d34bf875c3c3d4c2",
  },
  {
    _id: "631622af43187a2f33a283a5",
    name: "Pizza Margarita",
    description: "Tomate, mozzarella y albahaca fresca",
    price: 8,
    category: "63127b52d34bf875c3c3d4c3",
  },
  {
    _id: "631622af43187a2f33a283a6",
    name: "Pizza Hawaiana",
    description: "Tomate, mozzarella, jamón york y piña",
    price: 10,
    category: "63127b52d34bf875c3c3d4c3",
  },
  {
    _id: "631622af43187a2f33a283a7",
    name: "Espaguetis Carbonara",
    description: "Espaguetis salsa a base de huevo, panceta y queso parmesano",
    price: 7,
    category: "63127b52d34bf875c3c3d4c4",
  },
  {
    _id: "631622af43187a2f33a283a8",
    name: "Macarrones Boloñesa",
    description: "Macarrones con salsa de tomate y carne picada",
    price: 7,
    category: "63127b52d34bf875c3c3d4c4",
  },
  {
    _id: "631622af43187a2f33a283a9",
    name: "Hamburguesa Clásica",
    description: "Hamburguesa con queso cheddar y bacon",
    price: 5,
    category: "63127b52d34bf875c3c3d4c5",
  },
  {
    _id: "631622af43187a2f33a283b1",
    name: "Hambueguesa Ibérica",
    description:
      "Hamburguesa en pan de chapata con rúcula, queso curado y jamón serrano",
    price: 6,
    category: "63127b52d34bf875c3c3d4c5",
  },
  {
    _id: "631622af43187a2f33a283b2",
    name: "Ensalada César",
    description: "Ensalada con lechuga romana, salsa césar, parmesano y pollo",
    price: 5,
    category: "63127b52d34bf875c3c3d4c6",
  },
  {
    _id: "631622af43187a2f33a283b3",
    name: "Ensalada de la Casa",
    description: "Ensalada con lechuga romana, tomates y zanahoria rallada",
    price: 4,
    category: "63127b52d34bf875c3c3d4c6",
  },
];

const seed = async () => {
  console.log("Inserting items");
  await Item.deleteMany({});
  await Item.insertMany(items);
};

export default seed;
