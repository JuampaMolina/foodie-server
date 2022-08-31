import isMongoId from "../../../middleware/isMongoId.js";
import createCategory from "./createCategory.js";

export default () => {
  return [...isMongoId(), ...createCategory()];
};
