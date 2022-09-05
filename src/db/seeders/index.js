import mongo from "../mongo.js";
import userSeed from "./userSeed.js";
import categorySeed from "./categorySeed.js";
import itemSeed from "./itemSeed.js";
import orderSeed from "./orderSeed.js";

mongo.connect().then(() => {
  try {
    Promise.all([userSeed(), categorySeed(), itemSeed(), orderSeed()]).then(
      () => {
        console.log("All documents inserted");
        mongo.disconnect();
      }
    );
  } catch (error) {
    console.log(error);
  }
});
