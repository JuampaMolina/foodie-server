import userRoutes from "./modules/user/UserRoutes.js";
import itemRoutes from "./modules/item/ItemRoutes.js";
import categoryRoutes from "./modules/category/CategoryRoutes.js";
import orderRoutes from "./modules/order/OrderRoutes.js";

export default function (app) {
  app.use("/users", userRoutes);
  app.use("/items", itemRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);
}
