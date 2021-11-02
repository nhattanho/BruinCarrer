import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import image1 from "../home/images/example1.jpg";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./portfolio.css";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import {
  storePortfolio,
  storeUserProjects,
  storeClickProjects,
} from "../../redux/redux";

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
    width: "300px",
    height: "60px",
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
  button: {
    marginTop: "40px",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red",
    marginTop: "20px",
  },
  fileInput: {
    marginTop: "10px",
  },
  projectList: {
    width: "100%",
    // maxWidth: 700,
    margin: "auto",
    paddingBottom: "100px",
  },
  mainContainer: {
    //background: '#233',
    position: "relative",
    height: "100%",
    width: "99%",
    zIndex: 2,
    //display: "flex",
    //flexDirection: "row",
    //alignItems: "center",
    //top: '50%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    //textAlign: 'center'
    [theme.breakpoints.up("md")]: {
      width: "100% !important",
    },
  },
  container: {
    //padding: "5% 4% 0 4%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5%",
    },
  },
  cardContainer: {
    //maxWidth: 345,
    maxHeight: 300,
    minHeight: 220,
    marginTop: "2rem",
    borderRadius: "20px",
    maxWidth: "400px",
    minWidth: "300px",
  },
}));

const Portfolio = () => {
  /* Initialize states */
  const classes = useStyles();
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [username, setUsername] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState("");
  let [dateOfBirth, setdateOfBirth] = React.useState("");
  let [university, setUniversity] = React.useState("");
  let [major, setMajor] = React.useState("");
  let [graduationDate, setGraduationDate] = React.useState("");

  /* Use Redux */
  const userInfor = useSelector((state) => state);
  const dispatch = useDispatch();
  const email = userInfor.email;
  const [successProject, setSuccessProject] = React.useState(false);
  var projects = useSelector((state) => state.userProjects);
  //console.log("email: ", email);

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
  const [message, setMessage] = React.useState("");
  /* =======================================================================*/
  /* Use for modal false */
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#ff0000";
  }
  const closeModal = () => {
    setIsOpenFalse(false);
  };
  const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
  /* =======================================================================*/

  // stores all projects by the current user in redux
  useEffect(() => {
    axios
      .get(`http://localhost:5000/project/${email}/projects`)
      .then((res) => {
        if (res.data.success) {
          setSuccessProject(res.data.success);
          //setProject1(res.data.projects);
          dispatch(storeUserProjects(res.data.projects));
        } else {
          setSuccessProject(res.data.success);
          console.log("get projects fail", res.data);
        }
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  /* Button on click Edit/View*/
  function handleOnClick(index) {
    //console.log("click edit/view button");
    console.log(projects[index]);
    dispatch(storeClickProjects(projects[index], index));
  }

  /* Button on click Delete */
  function handleOnClickDelete(index) {
    console.log("hit delete button");
    console.log("current all projects: ", projects);
    const id = projects[index]._id;
    axios
      .delete(`http://localhost:5000/project/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          dispatch(storeClickProjects({}));
          projects.splice(index, 1);
          //console.log("current all projects: ", projects);
          dispatch(storeUserProjects(projects));
        } else {
          // user's profile isn't set up
          console.log("Project can not be deleted!");
          setIsOpenFalse(true);
          setIsOpenTrue(false);
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* Use React Hook */
  const onSubmit = () => {
    console.log("onsub clicked");
    if (firstName === "") firstName = userInfor.firstName;
    if (lastName === "") lastName = userInfor.lastName;
    if (username === "") username = userInfor.username;
    if (phoneNumber === "") phoneNumber = userInfor.phone;
    if (dateOfBirth === "") dateOfBirth = userInfor.dateOfBirth;
    if (university === "") university = userInfor.university;
    if (major === "") major = userInfor.major;
    if (graduationDate === "") graduationDate = userInfor.graduationDate;

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: userInfor.email,
      username: username,
      phone: phoneNumber,
      dateOfBirth: dateOfBirth,
      university: university,
      major: major,
      graduation: graduationDate,
      checkLogin: userInfor.checkLogin,
      //id: userInfor.id,
    };
    /*console.log(body);*/
    axios
      .put(`http://localhost:5000/user/email/update`, body) //Update database
      .then((res) => {
        // if user's profile is set up
        if (res.data.success) {
          setIsOpenTrue(true);
          setIsOpenFalse(false);
          setMessage(res.data.message);
          dispatch(storePortfolio(body));
        } else {
          // update fail
          console.log("Update fail");
          setIsOpenFalse(true);
          setIsOpenTrue(false);
          setMessage(res.data.message);
        }
      })
      .catch(function (e) {
        console.log(e); // "oh, no!"
      });
  };

  return (
    <div className={classes.root}>
      <div>
        <h1>My Information</h1>
        <form>
          <div>
            <InputField
              fullWidth={false}
              label="First Name"
              name="first_name"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Last Name"
              name="last_name"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.lastName}
              onChange={(e) => setLastName(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Username"
              name="username"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
          </div>
          <div>
            <InputField
              fullWidth={false}
              label="Email Address"
              name="email"
              variant="outlined"
              margin="dense"
              size="medium"
              disabled={true}
              defaultValue={userInfor.email}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Phone Number (digits only)"
              name="phone_number"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
              inputProps={{ style: { color: "black" } }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div>
            <InputField
              fullWidth={false}
              label="University"
              name="university"
              type="university"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.university}
              onChange={(e) => setUniversity(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Major"
              name="Major"
              type="Major"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.major}
              onChange={(e) => setMajor(e.target.value)}
              inputProps={{ style: { color: "black" } }}
            />
            <InputField
              fullWidth={false}
              label="Graduation Date"
              name="graduation_date"
              type="date"
              variant="outlined"
              margin="dense"
              size="medium"
              defaultValue={userInfor.graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)}
              inputProps={{ style: { color: "black" } }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className={classes.button}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      <h1>Projects</h1>
      <div className={classes.projectList}>
        <Box className={classes.mainContainer}>
          {successProject ? (
            <Grid
              container
              className={classes.container}
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {projects.map(
                (project, index) =>
                  project && (
                    <Grid item xs={12} sm={2} md={4} key={index}>
                      <Button
                        href={project.link}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Card className={classes.cardContainer}>
                          <CardActionArea>
                            <CardMedia
                              image={image1}
                              component="img"
                              alt={""}
                              height="140"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h4"
                              >
                                {project.title}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="subtitle2"
                                component="p"
                              >
                                Contributors: {project.contributors}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {project.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions style={{ padding: 0 }}>
                            <IconButton
                              aria-label="add to favorites"
                              style={{ marginLeft: 20, marginRight: 30 }}
                            >
                              <FavoriteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="share"
                              style={{ marginRight: 30 }}
                            >
                              <ShareIcon />
                            </IconButton>
                            <Link to="/add-project">
                              <Button
                                size="small"
                                color="primary"
                                id={index}
                                onClick={() => handleOnClick(index)}
                                style={{ marginRight: 30 }}
                              >
                                Edit/View
                              </Button>
                            </Link>
                            <Link>
                              <IconButton
                                aria-label="delete"
                                style={{ marginRight: 30 }}
                              >
                                <DeleteIcon
                                  onClick={() => handleOnClickDelete(index)}
                                />
                              </IconButton>
                            </Link>
                          </CardActions>
                        </Card>
                      </Button>
                    </Grid>
                  )
              )}
            </Grid>
          ) : (
            <div>
              <h>Hey {userInfor.username}, You do not have any projects!</h>
              <Link to="/add-project">
                <Button
                  size="small"
                  color="primary"
                  style={{ marginRight: 30 }}
                >
                  Add Project
                </Button>
              </Link>
            </div>
          )}
        </Box>
      </div>

      <Modal
        isOpen={modalIsOpenTrue}
        ariaHideApp={false}
        onAfterOpen={afterOpenModalTrue}
        onRequestClose={closeModalTrue}
        style={customStyles}
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
          <Link to="/add-project">
            <Button
              variant="contained"
              color="primary"
              onClick={closeModalTrue}
            >
              Add Project?
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
            justifyContent: "center",
          }}
        >
          <Link>
            <Button variant="contained" color="primary" onClick={closeModal}>
              Try again!
            </Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};
export default Portfolio;

// <h1>My Projects</h1>
// <div className={classes.projectList}>
//   <Divider />
//   <Link to="/project" style={{ textDecoration: "none" }}>
//     <ListItem button>
//       <ListItemText primary="Project1" secondary="created 01/01/2021" />
//     </ListItem>
//   </Link>
//         <Divider />
//         <Link to="/project" style={{ textDecoration: "none" }}>
//           <ListItem button>
//             <ListItemText primary="Project2" secondary="created 12/02/2020" />
//           </ListItem>
//         </Link>
//         <Divider />
//         <Link to="/project" style={{ textDecoration: "none" }}>
//           <ListItem button>
//             <ListItemText primary="Project3" secondary="created 02/20/2021" />
//           </ListItem>
//         </Link>
//         <Divider />
//       </div>

// <div className={classes.projectList} key={index}>
//   <Button
//     href={project.link}
//     target="_blank"
//     style={{ textDecoration: "none" }}
//   >
//     <ListItem button>
//       <ListItemText
//         primary={`Project ${index}`}
//         secondary="created 01/01/2021"
//       />
//     </ListItem>
//   </Button>
//   <p>{project.title}</p>
//   <p>{project.description}</p>
// </div>
