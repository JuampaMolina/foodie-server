import express from "express";
import cors from "cors";
import routes from "./app-routes.js";
import mongo from "./db/mongo.js";

const app = express();

app.use(express.json());
app.use(cors());
routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
  mongo.connect();
});

export default app;
