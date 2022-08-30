import isMongoId from "../isMongoId.js";
import createCategory from "./createCategory.js";

export default () => {
  return [...isMongoId(), ...createCategory()];
};
