import Category from "../../modules/category/CategoryModel.js";

// Los ids son fijos (no generados) porque son pocos y así se pueden usar a
// mano para probar la API manualmente. itemSeed.js y orderSeed.js referencian
// estas categorías por nombre, así que basta con tocar este array para
// añadir o renombrar una categoría.
const categories = [
  {
    _id: "63127b52d34bf875c3c3d4c1",
    name: "Bebidas",
    image: "assets/categories/drink.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c2",
    name: "Postres",
    image: "assets/categories/dessert.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c3",
    name: "Pizza",
    image: "assets/categories/pizza.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c4",
    name: "Pasta",
    image: "assets/categories/pasta.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c5",
    name: "Hamburguesa",
    image: "assets/categories/burger.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c6",
    name: "Ensaladas",
    image: "assets/categories/salad.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c7",
    name: "Sushi",
    image: "assets/categories/sushi.svg",
  },
  {
    _id: "63127b52d34bf875c3c3d4c8",
    name: "Patatas",
    image: "assets/categories/fries.svg",
  },
];

const seed = async () => {
  console.log("Inserting categories");
  await Category.deleteMany({});
  await Category.insertMany(categories);
};

export default seed;
export { categories };
