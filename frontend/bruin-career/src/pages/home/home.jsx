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
  MenuItem,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import axios from "axios";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeFoundProjects, storeClickProjects } from "../../redux/redux";

import "./home.css";
import { Link } from "react-router-dom";
import image from "../home/images/example1.jpg";
import image1 from "./images/engineering.jpg";
import image2 from "./images/business.png";
import image3 from "./images/art.png";
import image4 from "./images/science.png";

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
    width: "686px",
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
    margin: "auto",
  },
  mainContainer: {
    position: "relative",
    height: "100%",
    width: "99%",
    zIndex: 2,
    [theme.breakpoints.up("md")]: {
      width: "100% !important",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "5%",
    },
  },
  cardContainer: {
    maxHeight: 300,
    minHeight: 220,
    marginTop: "2rem",
    borderRadius: "20px",
    maxWidth: "400px",
    minWidth: "300px",
  },
}));

const filters = [
  {
    value: "title",
    label: "Project Title",
  },
  {
    value: "contributors",
    label: "Contributors",
  },
  {
    value: "category",
    label: "Category",
  },
];

const Home = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [value, setValue] = useState(""); //Input Field value
  const [filter, setFilter] = useState("");
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  /* =======================================================================*/
  const validate = () => {
    let temp = {};
    temp.value = value ? "" : "Must enter search term(s)";
    temp.filter = filter ? "" : "Must choose filter";

    // if (email) {
    //   if (checkIfValidEmail()) {
    //     temp.email = "";
    //   } else temp.email = "Enter Valid Email";
    // } else temp.email = "Must enter email";

    // temp.username = username ? "" : "Must enter username";
    // temp.password = password ? "" : "Must enter password";
    // temp.confirm_password = confirm_password ? "" : "Must confirm passowrd";
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  /* =======================================================================*/
  /* projects is a array of projects */
  const projects = useSelector((state) => state.foundProjects);
  /* Button on click Search */
  const onSubmit = () => {
    console.log("click in find button");
    if (!validate()) return;
    axios
      .get("http://localhost:5000/project/find", {
        params: {
          value: value,
          filter: filter,
        },
      })
      .then((res) => {
        if (!res.data.success) {
          setSuccess(false);
          setMessage(res.data.message);
        } else {
          setSuccess(true);
          dispatch(storeFoundProjects(res.data.projects));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Button on click Edit/View*/
  function handleOnClick(index) {
    console.log("click edit/view button");
    console.log(projects[index]);
    dispatch(storeClickProjects(projects[index], index));
  }

  /****************************************************************/
  return (
    <div>
      <div className="search-wrapper">
        <InputField
          fullWidth={false}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Search by"
          name="search"
          select
          required
          variant="outlined"
          margin="dense"
          size="medium"
          style={{ width: 140 }}
          inputProps={{ style: { color: "black" } }}
          error={!!errors.filter}
          helperText={errors.filter ? errors.filter : ""}
        >
          {filters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </InputField>
        <InputField
          fullWidth={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Search project/contributor"
          name="search"
          required
          autoComplete="Search project/contributor"
          variant="outlined"
          margin="dense"
          size="medium"
          inputProps={{ style: { color: "black" } }}
          error={!!errors.value}
          helperText={errors.value ? errors.value : ""}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 9, marginLeft: 2 }}
          onClick={onSubmit}
        >
          Search
        </Button>
      </div>
      <div className={classes.projectList}>
        <Box className={classes.mainContainer}>
          {success ? (
            <Grid
              container
              className={classes.container}
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {projects.map((project, index) => (
                <Grid item xs={12} sm={2} md={4} key={index}>
                  <Button
                    href={project.link}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Card className={classes.cardContainer}>
                      <CardActionArea>
                        <CardMedia
                          image={image}
                          component="img"
                          alt={""}
                          height="140"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h4">
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
                      <CardActions
                        style={{ padding: 0, justifyContent: "space-between" }}
                      >
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
                      </CardActions>
                    </Card>
                  </Button>
                </Grid>
              ))}
              ;
            </Grid>
          ) : (
            <div>
              <h> {message}</h>
            </div>
          )}
        </Box>
      </div>
      <div>
        <h1>Featured Projects by Category</h1>
      </div>
      <div className="project-list">
        <div className="proj1">
          <Link to="/engineering">
            <button className="project-card">
              <div className="category-title">Engineering</div>
              <img
                width="275"
                height="250"
                id="engineering"
                src={image1}
                alt={""}
              />
            </button>
          </Link>
        </div>
        <div className="proj2">
          <Link to="/business">
            <button className="project-card">
              <div className="category-title">Business</div>
              <img
                width="275"
                height="250"
                id="business"
                src={image2}
                alt={""}
              />
            </button>
          </Link>
        </div>
        <div className="proj3">
          <Link to="/art">
            <button type="button" className="project-card">
              <div className="category-title">Art</div>
              <img width="275" height="250" id="art" src={image3} alt={""} />
            </button>
          </Link>
        </div>
        <div className="proj4">
          <Link to="/science">
            <button type="button" className="project-card">
              <div className="category-title">Science</div>
              <img
                width="275"
                height="250"
                id="science"
                src={image4}
                alt={""}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
