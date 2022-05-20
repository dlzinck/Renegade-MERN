const { Schema, model } = require("mongoose");


// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 128,
    },
    password: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 128,
    },
    email: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 50,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


const User = model("user", userSchema);

module.exports = User;