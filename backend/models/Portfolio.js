var mongoose = require("mongoose");
//var mongooseTypePhone = require("mongoose-type-phone");

const portfolioSchema = new mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),

  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phone: {
    type: Number,
  },
  dateOfBirth: Date,
  university: String,
  major: String,
  graduation: Date,
  avatar: {
    type: Buffer,
  },

  imageUrl: String,
  degree: String,
});

module.exports = mongoose.model("Profile", portfolioSchema);
