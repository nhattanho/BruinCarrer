import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Grid, Box } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import Confetti from "react-confetti";
import Tooltip from "@material-ui/core/Tooltip";
import emailjs from "emailjs-com";
import Modal from "react-modal";
import Image from "./img/contactBackground.jpg"; // Import using relative path

const useStyles = makeStyles((theme) => ({
  main: {
    // backgroundImage: `url(${Image})`,
    // height: "100%",
    // width: "100%",
  },
  container: {
    top: "3rem",
    position: "relative",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      // top: '0rem',
      display: "grid",
      alignItems: "center",
      width: "100%",
      height: "100%",
      // marginTop: '40px'
    },
  },
  form: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    width: "100vh",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      // marginTop: '40px'
    },
  },
  info: {
    marginTop: "1rem",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem !important",
      // width: '99%'
    },
  },
  item: {
    color: "black",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "-1rem",
    },
  },
  button: {
    marginTop: "1.5rem",
    color: "tomato",
    borderColor: "tomato",
    display: "flex",
    justifyContent: "space-between",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
      height: "95%",
    },
  },
  heading: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "-1.5rem",
    },
  },
  input: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "100%",
    },
  },
}));

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

/* Change the style of component in Material UI */
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

const Contact = () => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState({});
  /* =======================================================================*/
  const validate = () => {
    let temp = {};
    temp.name = name ? "" : "Must enter name";

    if (email) {
      if (checkIfValidEmail()) {
        temp.email = "";
      } else temp.email = "Enter valid email";
    } else temp.email = "Must enter email";

    temp.message = message ? "" : "Please include a message";

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

  let templateParams = {
    from_name: name,
    to_name: "CS Group 97",
    email: email,
    company: company,
    message_html: message,
  };

  const sendEmail = () => {
    if (!validate()) return;

    emailjs
      .send(
        "cs97group",
        "template_lhdyhik",
        templateParams,
        "user_kejqDTteIQfYR06IrfIiW"
      )
      .then(
        (result) => {
          setIsOpenTrue(true);
          setIsOpenFalse(false);
          setName("");
          setEmail("");
          setCompany("");
          setMessage("");
          console.log(result.text);
        },
        (error) => {
          setIsOpenFalse(true);
          setIsOpenTrue(false);
          console.log(error.text);
        }
      );
  };
  return (
    <div className={classes.main}>
      <Box component="div" className={classes.container}>
        <Grid container justify="center" style={{ zIndex: 2 }}>
          <Box component="form" className={classes.form}>
            <div className={classes.info}>
              <ListItem className={classes.item}>
                <ListItemIcon className={classes.heading}>
                  <PhoneIphoneIcon />
                </ListItemIcon>
                <ListItemText primary="(xxx)-xxx-xxxx" />
              </ListItem>

              <ListItem className={classes.item}>
                <ListItemIcon className={classes.heading}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="davisho2411@gmail.com" />
              </ListItem>
            </div>

            <Typography
              variant="h5"
              style={{
                color: "tomato",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              contact us
            </Typography>
            <InputField
              className={classes.input}
              fullWidth={true}
              label="Name"
              variant="outlined"
              margin="dense"
              size="medium"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ style: { color: "black" } }}
              error={!!errors.name}
              helperText={errors.name ? errors.name : ""}
            />
            <br />
            <InputField
              className={classes.input}
              fullWidth={true}
              label="Email"
              variant="outlined"
              margin="dense"
              size="medium"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              inputProps={{ style: { color: "black" } }}
              error={!!errors.email}
              helperText={errors.email ? errors.email : ""}
            />
            <br />
            <InputField
              className={classes.input}
              fullWidth={true}
              label="Company"
              variant="outlined"
              margin="dense"
              size="medium"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              name="company"
              inputProps={{ style: { color: "black" } }}
            />
            <br />
            <InputField
              className={classes.input}
              fullWidth={true}
              label="Message"
              variant="outlined"
              margin="dense"
              size="medium"
              type="string"
              required
              multiline={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              inputProps={{ style: { color: "black", height: "80px" } }}
              error={!!errors.message}
              helperText={errors.message ? errors.message : ""}
            />
            <br />

            <Tooltip title="Send your idea to us!">
              <Button
                variant="outlined"
                fullWidth={true}
                endIcon={<SendIcon />}
                className={classes.button}
                onClick={sendEmail}
              >
                Contact Us
              </Button>
            </Tooltip>

            <Modal
              isOpen={modalIsOpenTrue}
              onAfterOpen={afterOpenModalTrue}
              onRequestClose={closeModalTrue}
              ariaHideApp={false}
              style={customStyles}
              contentLabel="Modal for succesfully login"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                Your email has sent succesfully!
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModalTrue}
                >
                  Close
                </Button>
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
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                Sending email has an error!
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={closeModal}
                >
                  Try again!
                </Button>
              </div>
            </Modal>
          </Box>
        </Grid>
      </Box>
      <Confetti
        opacity={0.5}
        style={{ zIndex: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Contact;
