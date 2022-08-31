import express from "express";

import routes from "./app-routes.js";
import config from "./app-config.js";
import mongo from "./db/mongo.js";

const app = express();

routes(app);
config(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
  mongo.connect();
});

export default app;
