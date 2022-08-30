import isMongoId from "../isMongoId.js";
import createItem from "./createItem.js";

export default () => {
  return [...isMongoId(), ...createItem()];
};
