import Category from "../../modules/category/CategoryModel.js";

const categories = [
  {
    _id: "63127b52d34bf875c3c3d4c1",
    name: "Bebidas",
  },
  {
    _id: "63127b52d34bf875c3c3d4c2",
    name: "Postres",
  },
  {
    _id: "63127b52d34bf875c3c3d4c3",
    name: "Pizza",
  },
  {
    _id: "63127b52d34bf875c3c3d4c4",
    name: "Pasta",
  },
  {
    _id: "63127b52d34bf875c3c3d4c5",
    name: "Hamburguesa",
  },
  {
    _id: "63127b52d34bf875c3c3d4c6",
    name: "Ensaladas",
  },
];

const seed = async () => {
  console.log("Inserting categories");
  await Category.deleteMany({});
  await Category.insertMany(categories);
};

export default seed;
