var mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  ownerCommentEmail: String,
  comments: String,
  projectId: String,
});

module.exports = mongoose.model("Comment", commentSchema);
