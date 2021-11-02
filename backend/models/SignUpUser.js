const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //parentId: mongoose.ObjectId
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  confirm_password: { type: String },
  checkLogin: { type: Boolean },

  phone: { type: Number },
  dateOfBirth: { type: String },
  university: { type: String },
  major: { type: String },
  graduation: { type: String },
  avatar: { type: Buffer },
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
