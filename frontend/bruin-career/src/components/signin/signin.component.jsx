import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

/* Import Redux */
import { useDispatch } from "react-redux";
import { storeEmail, storePortfolio, storeCheckLogin } from "../../redux/redux";

/* Material UI styles */
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
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
    marginTop: "10px",
  },
  newaccount: {
    marginTop: "10px",
  },
}));

/* Main here */
const Signin = (props) => {
  /* Use Redux */
  const dispatch = useDispatch();

  /* Use React Hook */
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPass] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [portfolio, setPortfolio] = React.useState("");
  const [errors, setErrors] = React.useState({});

  /****************************************************************/
  const validate = () => {
    let temp = {};

    if (email) {
      if (checkIfValidEmail()) {
        temp.email = "";
      } else temp.email = "Enter Valid Email";
    } else temp.email = "Must enter email";

    //temp.username = username ? "" : "Must enter username";
    temp.password = password ? "" : "Must enter password";
    //temp.confirm_password = confirm_password ? "" : "Must confirm passowrd";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  /****************************************************************/
  function checkIfValidEmail(event) {
    let re = /^[^\s@]+@[^\s@]+$/;
    return re.test(email) ? true : false;
  }
  /****************************************************************/
  /* Use for modal true */
  var subtitle;

  /* Not use now - Maybe in the future
  function afterOpenModalTrue() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "blue";
  }

  function closeModalTrue() {
    setIsOpenTrue(false);
  }
  */

  const [modalIsOpenTrue, setIsOpenTrue] = React.useState(false);
  /****************************************************************/
  /* Use for modal false */
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const closeModal = () => {
    setIsOpenFalse(false);
  };
  const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
  /****************************************************************/
  const setLogin = () => {
    //console.log(portfolio);
    dispatch(storePortfolio(portfolio));
    dispatch(storeCheckLogin(true));
  };

  const onSubmit = () => {
    if (!validate()) return;

    axios
      .get("http://localhost:5000/user/login", {
        params: {
          email: email,
          password: password,
        },
      })
      .then(
        /* The user exists in DB */
        (res) => {
          if (!res.data.success) {
            setIsOpenFalse(true);
            setIsOpenTrue(false);
            setMessage(res.data.message);
          } else {
            dispatch(storeEmail(email));
            axios
              .get(`http://localhost:5000/user/email/${email}/portfolio`)
              .then((res) => {
                if (res.data.success) {
                  setIsOpenTrue(true);
                  setIsOpenFalse(false);
                  setMessage(res.data.message);
                  setPortfolio(res.data.user);
                  // dispatch(storePortfolio(res.data.user));
                } else {
                  setIsOpenFalse(true);
                  setIsOpenTrue(false);
                  setMessage(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };
  /****************************************************************/
  return (
    <div className={classes.mainform}>
      <form className={classes.form}>
        <InputField
          className={classes.input}
          fullWidth={true}
          label="Email"
          name="email"
          required
          autoComplete="email"
          variant="outlined"
          margin="dense"
          size="medium"
          inputProps={{ style: { color: "black" } }}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email ? errors.email : ""}
        />
        <InputField
          className={classes.input}
          fullWidth={true}
          label="Password"
          name="password"
          required
          autoComplete="current-password"
          variant="outlined"
          margin="dense"
          size="medium"
          type="password"
          inputProps={{ style: { color: "black" } }}
          onChange={(e) => setPass(e.target.value)}
          error={!!errors.password}
          helperText={errors.password ? errors.password : ""}
        />
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </form>

      <div className={classes.newaccount}>
        <Link to="/register" variant="body2">
          {"Don't have an account? Register"}
        </Link>
      </div>

      <Modal
        isOpen={modalIsOpenTrue}
        // onAfterOpen={afterOpenModalTrue}
        // onRequestClose={closeModalTrue}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Modal for succesfully login"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Link to="/home">
            <Button variant="contained" color="primary" onClick={setLogin}>
              Home page
            </Button>
          </Link>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpenFalse}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{message}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="small">
              Register
            </Button>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={closeModal}
            >
              Try Again
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
export default Signin;
