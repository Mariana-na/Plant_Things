const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  plantsAdded: {
    type: Number,
    default: 0,
  },
  userImage: {
    type: String,
    default:
      "https://res.cloudinary.com/dpncxyxs4/image/upload/v1689919000/default_profile_yll6x7.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
