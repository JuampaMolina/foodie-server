import isMongoId from "../isMongoId";
import createItem from "./createItem";

export default () => {
  return [...isMongoId(), ...createItem()];
};
