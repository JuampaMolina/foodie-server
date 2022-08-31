import isMongoId from "../../../middleware/isMongoId.js";
import createItem from "./createItem.js";

export default () => {
  return [...isMongoId(), ...createItem()];
};
