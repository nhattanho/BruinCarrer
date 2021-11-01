const express = require("express");
const router = express.Router();
const User = require("../models/SignUpUser");

//for hashing passwords
const bcrypt = require("bcrypt");
const saltRounds = 10;
/*======================================Get method===================================*/

/* Register a user for requesting http://localhost:5000/user/register*/
router.post("/register", (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    confirm_password,
    username,
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

async function passMatch(user, password) {
  //compare input password with hashed password in db
  const match = await bcrypt.compare(password, user.password)
  return match
}

/* User login for requesting http://localhost:5000/user/login
 body: {email, password} */
router.get("/login", (req, res) => {
  const { email, password } = req.query;
  console.log("body", email, password);

  //check if there is a input email or password
  if (email.length > 0 && password.length > 0){
  //find user with given email in the database

  User.findOne({ email: email }, async (err, user) => {

    //no user in database has specified email
    if (!user) {
      console.log("User does not exists");
      res.send({ success: false, message: "User does not exist" });
    } else {
      //email exists but incorrect password
      let match = await passMatch(user, password);
      if (!match) {
        console.log("email exists but incorrect password");
        res.send({
          success: false,
          message: "Email exists but incorrect password",
        });
      } else {
        //email and passwords match
        console.log("Success: email and password match");
        res.send({ success: true, message: "Successful login" });
      }
    }
  });
}
else{
     console.log("no inputted email or password");
     res.send({ success: false, message: "no inputted email or password" });
}
});

module.exports = router;
