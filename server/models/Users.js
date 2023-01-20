import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 2
    },
    picturePath: {
      type: String,
      default: ""
    },
    friends: {
      type: Array,
      defualt: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
  },
  { timestamps: true }
);

const User = mongoose.model("User", UsersSchema);

export default User;
