var mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  //_id: mongoose.ObjectId,
  ownerEmail: { type: String },
  title: { type: String },
  category: { type: String },
  contributors: { type: String },
  description: { type: String },
  link: { type: String },
  //   startDate: Date,
  //   endDate: Date,
});

module.exports = mongoose.model("Project", projectSchema);
