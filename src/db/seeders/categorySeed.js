import Category from "../../modules/category/CategoryModel.js";

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
];

const seed = async () => {
  console.log("Inserting categories");
  await Category.deleteMany({});
  await Category.insertMany(categories);
};

export default seed;
