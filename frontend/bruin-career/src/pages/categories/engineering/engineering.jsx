import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import image1 from "../../home/images/example1.jpg";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import {
  storePortfolio,
  storeFoundProjects,
  storeClickProjects,
} from "../../../redux/redux";

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

const Engineering = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.foundProjects);

  const [success, setSuccess] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/project/find", {
        params: {
          value: "engineering",
          filter: "category",
        },
      })
      .then((res) => {
        if (!res.data.success) {
          setSuccess(false);
        } else {
          setSuccess(true);
          dispatch(storeFoundProjects(res.data.projects));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleOnClick(index) {
    console.log("click edit/view button");
    console.log(projects[index]);
    dispatch(storeClickProjects(projects[index], index));
  }

  const classes = useStyles();
  return (
    <div>
      <h1>Engineering Projects</h1>
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
                          image={image1}
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
              <h>No Engineering Projects!</h>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};
export default Engineering;
