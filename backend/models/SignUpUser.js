const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String },
  confirm_password: { type: String },
});

// const userSchema = new Schema({
//   email: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   confirm_password: { type: String, required: true },
// });

const SignUpUser = mongoose.model("bruin", userSchema);
module.exports = SignUpUser;
