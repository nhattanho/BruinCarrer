const express = require("express");
const router = express.Router();
const User = require("../models/SignUpUser");
//const Portfolio = require("../models/Portfolio");

//for hashing passwords
const bcrypt = require("bcrypt");
const saltRounds = 10;
/*======================================POST method===================================*/

/* Register a user for requesting http://localhost:5000/user/register*/
router.post("/register", (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    confirm_password,
    username,
    checkLogin,
    dateOfBirth,
    graduation,
  } = req.body;
  console.log("body", req.body);

  if (password !== confirm_password) {
    console.log("Password did not match");
    return res.send({ success: false, message: "Password did not match" });
  }

  User.find({
    $or: [{ email: email }, { username: username }],
  })
    .exec()
    .then((user) => {
      //console.log("user is: ", user);
      if (user.length >= 1) {
        let message;
        if (user[0].email === email) message = "Email already exists";
        else message = "User name already exists";
        res.send({ success: false, message: message });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            res.send({ success: false, message: err });
          } else {
            const user = new User({
              email: email,
              firstName: firstName,
              lastName: lastName,
              password: hash,
              username: username,
              checkLogin: checkLogin,
              graduation: graduation,
              dateOfBirth: dateOfBirth,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.send({
                  success: true,
                  message: "User successfully added",
                });
              })
              .catch((err) => {
                console.log(err);
                res.send({ success: false, message: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.send({ success: false, message: err });
    });
});

/*======================================PUT method===================================*/
/*Update portfolio for user
http://localhost:5000/user/email/:email/update*/
router.put("/email/update", (req, res) => {
  let updateUser = req.body;

  // show original data in backend log
  // User.findById(req.body.id, (err, data) => {
  //   console.log(req.body.id);
  //   console.log("Original Data", data);
  // });

  // show
  // User.findOneAndUpdate({ _id: req.params.id }, updateUser, {
  //   new: true,
  // })
  updateUser.phone = updateUser.phone.toString().replace(/[- )(]/g, "");
  User.findOneAndUpdate({ email: req.body.email }, updateUser, {
    new: true,
  })
    .exec()
    .then((data) => {
      console.log("Updated data", data);
      res.send({
        success: true,
        message: "Information updated",
      });
    })
    .catch((err) => {
      console.log("update fail in backend log");
      res.send({
        success: false,
        message: "Update failed",
      });
    });
});

/*======================================Get method===================================*/

async function checkPass(user, password) {
  //compare input password with hashed password in db
  const match = await bcrypt.compare(password, user.password);
  return match;
}

/* User login for requesting http://localhost:5000/user/login
 body: {email, password} */
router.get("/login", (req, res) => {
  const { email, password } = req.query;
  console.log("body", email, password);

  //check if there is a input email or password
  if (email.length > 0 && password.length > 0) {
    //find user with given email in the database
    User.findOne({ email: email }, async (err, user) => {
      //no user in database has specified email
      if (!user) {
        console.log("User does not exists");
        res.send({ success: false, message: "User does not exist!" });
      } else {
        //email exists but incorrect password
        let match = await checkPass(user, password);
        if (!match) {
          console.log("email exists but incorrect password");
          res.send({
            success: false,
            message: "Incorrect password",
          });
        } else {
          //email and passwords match
          console.log("Success: email and password match");
          res.send({ success: true, message: "Successful login!" });
        }
      }
    });
  } else {
    console.log("no inputted email or password");
    res.send({
      success: false,
      message: "Email or Password can not be empty!",
    });
  }
});

/* Get portfolio
http://localhost:5000/user/email/:email/portfolio*/
router.get("/email/:email/portfolio", async (req, res) => {
  const { email } = req.params;
  console.log("Inside get Portfolio");
  /* Check if portfolio exist*/
  User.findOne({ email: email }, async (err, user) => {
    console.log("user", user);

    if (user) {
      res.send({ success: true, message: "Success!", user: user });
    } else {
      res.send({
        success: false,
        message: `User does not exist for ${email}`,
      });
    }
  });
});

// create user protfolio
// http://localhost:5000/user/email/:email/portfolio
// router.post('/email/:email/portfolio', async (req, res) => {
//   let { email } = req.params
//   let {   firstName,
//           lastName,
//           username,
//           email,
//           phone,
//           dateOfBirth,
//           university,
//           major,
//           graduation,
//           avatar,
//           imageUrl,
//           degree,
//      } = req.body

//   let protfolio = new Protfolio({
//             firstName,
//             lastName,
//             username,
//             email,
//             phone,
//             dateOfBirth,
//             university,
//             major,
//             graduation,
//             avatar,
//             imageUrl,
//             degree,
//   });
//   console.log('creating protfolio with', protfolio);
// if (!protfolio.firstName      ||
//     !protfolio.lastName       ||
//     !protfolio.username       ||
//     !protfolio.email          ||
//     !protfolio.phone          ||
//     !protfolio.dateOfBirth    ||
//     !protfolio.university     ||
//     !protfolio.major          ||
//     !protfolio.graduation     ||
//     !protfolio.avatar         ||
//     !protfolio.imageUrl       ||
//     !protfolio.degree ) {
//     console.log("Invalid input(s)");
//     res.send({
//          success: false,
//          message: "Please double check input fields",
//        });
// }
//   project.save
//   .exec
//   .then(data => {
//       console.log("Protfolio created", data);
//       res.send({
//         success: true,
//         message: "Protfolio created",
//       });
//    })
//    .catch((err) => {
//        console.log("Creation failed");
//        res.send({
//          success: false,
//          message: "Cannot creat Protfolio",
//        });
//    });

// create user project
// http://localhost:5000/user/email/:email/project
// router.post('/email/:email/project', async (req, res) => {
//   let { email } = req.params
//   let {  title, contributors,category, description,projectUrl,
//      } = req.body

//   let project = new Project({
//     title,
//     contributors,
//     category,
//     description,
//     projectUrl,
//   });
//   console.log('creating project with', project);
// if (!project.title|| !project.category ||
//     !project.projectUrl || !project.description || !project.contributors) {
//     console.log("Invalid input(s)");
//     res.send({
//          success: false,
//          message: "Please double check input fields",
//        });
//}
//   project.save
//   .exec
//   .then(data => {
//       console.log("Project created", data);
//       res.send({
//         success: true,
//         message: "Project created",
//       });
//    })
//    .catch((err) => {
//        console.log("Creation failed");
//        res.send({
//          success: false,
//          message: "Cannot creat project",
//        });
//    });

/* User login for requesting http://localhost:5000/user/delete
 body: {email, password} */
/* router.post("/delete", (req, res) => {
  const {email, password, confirm_password} = req.body;
  if (password !== confirm_password) {
    console.log("Enter correct password for deletion");
    return res.send({success: false, message: "Password did not match"});
  }
  if (email.length > 0 && password.length > 0) {
    User.findOneAndDelete({email: email}, async (err, user) => {
      if (!user) {
        console.log("No such user");
        res.send({success: false, message: "No such user"});
      } else {
        let match = await checkPass(user, password);
        if (!match) {
          console.log("Incorrect Password");
          res.send({success: false, message: "Incorrect password"});
        } else {
          //email and passwords match
          console.log("Success: email and password match");
          res.send({ success: true, message: "Successful login!" });
        }
      }
    })
  } else {
    console.log("Make sure input fields are correct");
    res.send({
      success: false,
      message: "Email or Password can not be empty!",
    });
  }
}); */
module.exports = router;
