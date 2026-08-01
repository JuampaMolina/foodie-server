import mongoose from "mongoose";
import Item from "../../modules/item/ItemModel.js";
import { categories } from "./categorySeed.js";

const categoryIdByName = Object.fromEntries(
  categories.map((category) => [category.name, category._id])
);

// [nombre, descripción, precio, categoría]. Los ids se generan aquí (no se
// escriben a mano) para no arrastrar el mismo fallo que tenía este fichero
// antes: un id de categoría mal copiado no se detecta hasta sembrar contra
// una base de datos real.
const rows = [
  // Bebidas
  ["Agua", "Botella de agua 50cl", 2, "Bebidas"],
  ["Coca-Cola", "Lata de Coca-Cola 33cl", 2, "Bebidas"],
  ["Fanta Naranja", "Lata de Fanta Naranja 33cl", 2, "Bebidas"],
  ["Cerveza Artesana", "Botella de cerveza artesana 33cl", 3, "Bebidas"],
  ["Zumo de Naranja", "Zumo de naranja natural 33cl", 3, "Bebidas"],

  // Postres
  ["Tiramisú", "Postre tradicional italiano con sabor a café", 4, "Postres"],
  ["Brownie", "Bizcocho de chocolate y nueces", 4, "Postres"],
  [
    "Tarta de Queso",
    "Tarta de queso al horno con mermelada de arándanos",
    5,
    "Postres",
  ],
  [
    "Helado de Vainilla",
    "Dos bolas de helado artesano de vainilla",
    3,
    "Postres",
  ],
  ["Crema Catalana", "Crema catalana con azúcar caramelizado", 4, "Postres"],

  // Pizza
  ["Pizza Margarita", "Tomate, mozzarella y albahaca fresca", 8, "Pizza"],
  ["Pizza Hawaiana", "Tomate, mozzarella, jamón york y piña", 10, "Pizza"],
  [
    "Pizza Cuatro Quesos",
    "Mozzarella, gorgonzola, parmesano y queso de cabra",
    11,
    "Pizza",
  ],
  ["Pizza Pepperoni", "Tomate, mozzarella y pepperoni picante", 10, "Pizza"],
  [
    "Pizza Vegetal",
    "Tomate, mozzarella, pimiento, cebolla y champiñón",
    9,
    "Pizza",
  ],

  // Pasta
  [
    "Espaguetis Carbonara",
    "Espaguetis salsa a base de huevo, panceta y queso parmesano",
    7,
    "Pasta",
  ],
  [
    "Macarrones Boloñesa",
    "Macarrones con salsa de tomate y carne picada",
    7,
    "Pasta",
  ],
  [
    "Lasaña de Carne",
    "Lasaña casera con carne y bechamel gratinada",
    9,
    "Pasta",
  ],
  [
    "Ravioli de Espinacas",
    "Ravioli relleno de espinacas y ricotta con salsa de mantequilla",
    8,
    "Pasta",
  ],
  ["Penne Arrabiata", "Penne con salsa de tomate picante y ajo", 7, "Pasta"],

  // Hamburguesa
  [
    "Hamburguesa Clásica",
    "Hamburguesa con queso cheddar y bacon",
    5,
    "Hamburguesa",
  ],
  [
    "Hamburguesa Ibérica",
    "Hamburguesa en pan de chapata con rúcula, queso curado y jamón serrano",
    6,
    "Hamburguesa",
  ],
  [
    "Hamburguesa Vegana",
    "Hamburguesa de garbanzos y quinoa con aguacate",
    6,
    "Hamburguesa",
  ],
  [
    "Hamburguesa BBQ",
    "Hamburguesa con salsa barbacoa, bacon y cebolla crujiente",
    6,
    "Hamburguesa",
  ],
  [
    "Hamburguesa Doble Queso",
    "Doble carne con doble de queso cheddar",
    7,
    "Hamburguesa",
  ],

  // Ensaladas
  [
    "Ensalada César",
    "Ensalada con lechuga romana, salsa césar, parmesano y pollo",
    5,
    "Ensaladas",
  ],
  [
    "Ensalada de la Casa",
    "Ensalada con lechuga romana, tomates y zanahoria rallada",
    4,
    "Ensaladas",
  ],
  [
    "Ensalada Griega",
    "Tomate, pepino, cebolla, aceitunas y queso feta",
    5,
    "Ensaladas",
  ],
  [
    "Ensalada de Quinoa",
    "Quinoa, aguacate, tomate cherry y vinagreta de limón",
    6,
    "Ensaladas",
  ],
  [
    "Ensalada Caprese",
    "Tomate, mozzarella fresca y albahaca con aceite de oliva",
    5,
    "Ensaladas",
  ],

  // Sushi
  ["Maki Salmón", "Ocho piezas de maki relleno de salmón fresco", 12, "Sushi"],
  ["Maki Atún", "Ocho piezas de maki relleno de atún fresco", 12, "Sushi"],
  ["California Roll", "Ocho piezas con surimi, aguacate y pepino", 11, "Sushi"],
  [
    "Nigiri Variado",
    "Selección de ocho nigiri de salmón, atún y langostino",
    14,
    "Sushi",
  ],
  ["Gyozas", "Cinco empanadillas japonesas de cerdo y verduras", 6, "Sushi"],

  // Patatas
  ["Patatas Fritas", "Ración de patatas fritas clásicas", 3, "Patatas"],
  ["Patatas Bravas", "Patatas fritas con salsa brava y alioli", 4, "Patatas"],
  ["Patatas Gajo", "Patatas gajo especiadas al horno", 4, "Patatas"],
  [
    "Patatas con Alioli",
    "Patatas fritas con salsa alioli casera",
    4,
    "Patatas",
  ],
  ["Patatas Deluxe", "Patatas gajo con especias y salsa alioli", 4, "Patatas"],
];

const items = rows.map(([name, description, price, categoryName]) => ({
  _id: new mongoose.Types.ObjectId(),
  name,
  description,
  price,
  category: categoryIdByName[categoryName],
}));

const seed = async () => {
  console.log("Inserting items");
  await Item.deleteMany({});
  await Item.insertMany(items);
};

export default seed;
export { items };
