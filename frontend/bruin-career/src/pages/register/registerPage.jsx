import { TextField, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import Modal from "react-modal";
/* =======================================================================*/
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const InputField = withStyles({
  root: {
    marginLeft: "10px",
    marginRight: "10px",
    "& label.Mui-focused": {
      color: "tomato",
    },
    "& label": {
      color: "tan",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "tan",
      },
      "&:hover fieldset": {
        borderColor: "tan",
      },
      "& .Mui-focused fieldset": {
        borderColor: "tan",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  form: {
    display: "column",
  },
  button: {
    marginTop: "20px",
  },
  signin: {
    marginTop: "20px",
  },
}));
/* =======================================================================*/
const Register = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  /* =======================================================================*/
  const validate = () => {
    let temp = {};
    temp.firstName = firstName ? "" : "Must enter first name";
    temp.lastName = lastName ? "" : "Must enter last name";

    if (email) {
      if (checkIfValidEmail()) {
        temp.email = "";
      } else temp.email = "Enter Valid Email";
    } else temp.email = "Must enter email";

    if (password) {
      if (password.length >= 8) {
        temp.password = "";
      } else temp.password = "Must be 8 or more characters";
    } else temp.password = "Must enter password";

    temp.username = username ? "" : "Must enter username";
    temp.confirm_password = confirm_password ? "" : "Must confirm passowrd";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  /* =======================================================================*/
  function checkIfValidEmail(event) {
    let re = /^[^\s@]+@[^\s@]+$/;
    return re.test(email) ? true : false;
  }
  /* =======================================================================*/
  /* Use for modal true */
  var subtitle;
  function afterOpenModalTrue() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue";
  }

  function closeModalTrue() {
    setIsOpenTrue(false);
  }
  const [modalIsOpenTrue, setIsOpenTrue] = React.useState(false);
  const [message, setMessage] = React.useState();
  /* =======================================================================*/
  /* Use for modal false */
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  const closeModal = () => {
    setIsOpenFalse(false);
  };
  const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
  /* =======================================================================*/
  const onSubmit = () => {
    if (!validate())
      // don't send submit if form not filled properly
      return;

    console.log("onsub clicked");
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirm_password: confirm_password,
      username: username,
      checkLogin: false,
      //phone: "xxx-xxx-xxxx",
      //dateOfBirth: "1991-01-01",
      // university: "",
      // major: "",
      //graduation: "1991-01-01",
      // avatar: "",
    };
    axios
      .post("http://localhost:5000/user/register", body) //Update database
      .then((res) => {
        // if user's profile is set up
        if (res.data.success) {
          setIsOpenTrue(true);
          setIsOpenFalse(false);
          setMessage(res.data.message);
        } else {
          // user's profile isn't set up
          console.log("user profile is not set up");
          setIsOpenFalse(true);
          setIsOpenTrue(false);
          setMessage(res.data.message);
        }
      })
      .catch(function (e) {
        console.log(e); // "oh, no!"
      });
  };
  /* =======================================================================*/
  return (
    <div className={classes.mainform}>
      <h1>Register as a new BruinCareer user</h1>
      <form>
        <div className={classes.form}>
          <InputField
            className={classes.input}
            fullWidth={false}
            label="First Name"
            name="first_name"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName : ""}
          />
          <InputField
            className={classes.input}
            fullWidth={false}
            label="Last Name"
            name="last_name"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName : ""}
          />
        </div>
        <div>
          <InputField
            className={classes.input}
            fullWidth={false}
            label="Email Address"
            name="email"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={!!errors.email}
            helperText={errors.email ? errors.email : ""}
          />
          <InputField
            className={classes.input}
            fullWidth={false}
            label="Username"
            name="username"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            error={!!errors.username}
            helperText={errors.username ? errors.username : ""}
          />
        </div>
        <div>
          <InputField
            className={classes.input}
            fullWidth={false}
            label="Password"
            name="password"
            type="password"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={!!errors.password}
            helperText={errors.password ? errors.password : ""}
          />
          <InputField
            className={classes.input}
            fullWidth={false}
            label="Confirm Password"
            name="confirm_password"
            type="password"
            required={true}
            variant="outlined"
            margin="dense"
            size="medium"
            inputProps={{ style: { color: "black" } }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirm_password}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password ? errors.confirm_password : ""}
          />
        </div>
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </form>

      <div className={classes.signin}>
        <Link to="/" variant="body2">
          {"Already have an account? Sign in!"}
        </Link>
      </div>

      <Modal
        isOpen={modalIsOpenTrue}
        // onAfterOpen={afterOpenModalTrue}
        // onRequestClose={closeModalTrue}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Modal for succesfully login"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Congrat, You register successfully. Go to Login page!
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              onClick={closeModalTrue}
            >
              Login
            </Button>
          </Link>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpenFalse}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link to="/register">
            <Button variant="contained" color="primary" onClick={closeModal}>
              Try again!
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
export default Register;
