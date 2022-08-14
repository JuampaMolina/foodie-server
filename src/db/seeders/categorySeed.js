import Category from "../../models/Category.js";
import mongo from "../mongo.js";

const categories = [
  {
    name: "Bebidas",
  },
  {
    name: "Postres",
  },
  {
    name: "Pizza",
  },
  {
    name: "Pasta",
  },
  {
    name: "Hamburguesa",
  },
  {
    name: "Curry",
  },
  {
    name: "Ensaladas",
  },
];

mongo
  .connect()
  .then(async () => {
    await Category.deleteMany({});
    console.log("Inserting documents");
    await Category.insertMany(categories);
  })
  .then(mongo.disconnect);
