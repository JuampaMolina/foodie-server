import env from "./config/env.js";
import express from "express";
import cors from "cors";
import routes from "./app-routes.js";
import mongo from "./db/mongo.js";

const app = express();

app.use(express.json());
app.use(cors());
routes(app);

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.PORT}`);
  mongo.connect();
});

export default app;
