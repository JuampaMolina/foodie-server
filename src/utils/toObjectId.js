import moongose from "mongoose";

export default function (id) {
  return moongose.Types.ObjectId(id);
}
