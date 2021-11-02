const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
/*======================================POST method===================================*/

/* Save new project for requesting http://localhost:5000/project/add*/
router.post("/add", (req, res) => {
  console.log("Inside post project");
  const {
    ownerEmail,
    title,
    contributors,
    category,
    description,
    link,
    projectid,
  } = req.body;
  //console.log("body", req.body);
  let updateProject = req.body;
  if (projectid) {
    //exist ==>update
    Project.findOneAndUpdate({ _id: projectid }, updateProject, {
      new: true,
    })
      .exec()
      .then((data) => {
        console.log("Updated project", data);
        res.send({
          success: true,
          message: "Project updated",
          action: "updated",
        });
      })
      .catch((err) => {
        console.log("update fail in backend log");
        res.send({
          success: false,
          message: "Project Updated failed",
        });
      });
  } else {
    // save new project
    const project = new Project({
      ownerEmail: ownerEmail,
      title: title,
      contributors: contributors,
      category: category,
      description: description,
      link: link,
      //id: projectid,
    });

    project
      .save()
      .then((result) => {
        console.log(result); // for test
        res.send({
          success: true,
          message: "Project successfully added!",
          action: "added",
        });
      })
      .catch((err) => {
        console.log("can not save new project: ", err);
        res.send({ success: false, message: err });
      });
  }
});

/*======================================GET method===================================*/
router.get("/:email/projects", async (req, res) => {
  const { email } = req.params;
  console.log("Inside get project");
  /* Check if portfolio exist*/
  Project.find({ ownerEmail: email }, async (err, projects) => {
    console.log("projects", projects);
    if (projects.length != 0) {
      res.send({ success: true, message: "Success!", projects: projects });
    } else {
      console.log("do not have any project!");
      res.send({
        success: false,
        message: "You have not have any projects!",
      });
    }
  });
});

router.get("/find", async (req, res) => {
  console.log("Inside find project");
  const { value, filter } = req.query;
  console.log(value);
  console.log(filter);
  /* Check if project exist - ignore case sensitve*/
  Project.find({ [filter]: new RegExp(value, "i") }, async (err, projects) => {
    console.log("projects", projects);
    if (err) {
      res.send({
        success: false,
        message: err,
      });
    }
    if (projects.length != 0) {
      res.send({ success: true, message: "Success!", projects: projects });
    } else {
      console.log("Can not find!");
      res.send({
        success: false,
        message: "Can not find!",
      });
    }
  });
});

/*======================================DELETE method===================================*/
//delete user's project
router.delete("/delete/:id", async (req, res) => {
  console.log("In delete project");
  const { id } = req.params;
  Project.findOneAndRemove({ _id: id }, (err, project) => {
    console.log(project);
    if (err) {
      res.send({
        success: false,
        message: err,
      });
    }
    if (project) {
      res.send({
        success: true,
        message: "Deleted Successfully!",
        action: "deleted",
      });
      //res.redirect("/portfolio");
    } else {
      res.send({
        success: false,
        message: "Deleted Failed!",
      });
    }
  });
});

//update user's project
//http://localhost:5000/user/email/:email/project/
// router.put("/email/:email/update", (req, res) => {
//   const {
// ownerEmail,
// title,
// contributors,
// category,
// description,
// link,
//   } = req.body;
//   console.log("updating project with", req.body);
//   User.findOne({ email: email }, async (err, user) => {
//     if (user.length > 0) {
//       const user = new User({
// ownerEmail,
// title,
// contributors,
// category,
// description,
// link,
//   } = req.bod
//       });
//       user
//         .save()
//         .then((result) => {
//           console.log(result);
//           res.send({
//             success: true,
//             message: "Successfully updated!",
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.send({ success: false, message: err });
//         });
//     }
//   });
// });

// router.delete("/delete/:projectid", isLoggedIn, (req, res, next) => {
//   const { id } = req.params;
//   User.findOneAndRemove({ _id: id }, (err) => {
//     if (err) {
//       req.flash("error", err);
//       return res.redirect("/project");
//     }

//     req.flash("success", "Your project has been deleted.");
//     req.logout();
//     return res.redirect("/home");
//   });
// });
module.exports = router;
