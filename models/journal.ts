import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Journal text is required!"],
  },
});

const User = models.User || model("User", userSchema);
export default User;
