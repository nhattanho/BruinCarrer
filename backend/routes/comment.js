const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/add", (req, res) => {
  console.log("Inside post comment");
  const { ownerCommentEmail, projectId, comments } = req.body;
  // save new project
  const comment_package = new Comment({
    ownerCommentEmail: ownerCommentEmail,
    projectId: projectId,
    comments: comments,
  });

  comment_package
    .save()
    .then((result) => {
      console.log(result); // for test
      res.send({
        success: true,
        message: "Your comment successfully added!",
      });
    })
    .catch((err) => {
      console.log("can not save your comment: ", err);
      res.send({ success: false, message: err });
    });
});

router.get("/get", async (req, res) => {
  const { projectId } = req.query;
  console.log("Inside get comment");
  console.log(projectId);
  /* Check if comment exist*/
  Comment.find({ projectId: projectId }, async (err, comments) => {
    // console.log("comments ", comments);
    if (comments.length != 0) {
      res.send({ success: true, message: "Success!", comments: comments });
    } else {
      console.log("do not have any comment!");
      res.send({
        success: false,
        message: "do not have any comment!",
      });
    }
  });
});

module.exports = router;
