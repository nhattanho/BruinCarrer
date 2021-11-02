import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import Modal from "react-modal";
import SendIcon from "@material-ui/icons/Send";
/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import {
  storeClickProjects,
  storeClickProjectsComment,
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
    marginRight: "20px",
    marginTop: "10px",
    marginBottom: "80px",
    width: "300px",
    height: "50px",
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
    maxWidth: 700,
    margin: "auto",
    paddingBottom: "100px",
  },
}));

const categories = [
  {
    value: "engineering",
    label: "Engineering",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "arts",
    label: "Arts",
  },
  {
    value: "science",
    label: "Science",
  },
];

const AddProject = () => {
  const classes = useStyles();

  const [projectTitle, setProjectTitle] = React.useState("");
  const [contributors, setContributors] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [projectLink, setProjectLink] = React.useState("");
  const [message, setMessage] = React.useState();
  const [index, setIndex] = React.useState(-1);
  const [errors, setErrors] = React.useState({});
  const [owner, setOwner] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [comment, setComment] = React.useState("");
  /* =======================================================================*/
  const validate = () => {
    let temp = {};
    temp.projectTitle = projectTitle ? "" : "Must enter project title";
    temp.contributors = contributors ? "" : "Must enter contributor(s)";
    temp.category = category ? "" : "Must select a category";
    temp.description = description ? "" : "Must enter a description";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
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
    subtitle.style.color = "#ff0000";
  }
  const closeModal = () => {
    setIsOpenFalse(false);
  };
  const [modalIsOpenFalse, setIsOpenFalse] = React.useState(false);
  /* =======================================================================*/

  /* Use Redux */
  const userInfor = useSelector((state) => state);
  const dispatch = useDispatch();
  const clickProject = userInfor.clickProject;
  var comments = userInfor.comments;
  //console.log("length of click project", userInfor.clickIndex);

  useEffect(() => {
    if (userInfor.clickIndex !== -1) {
      //console.log(clickProject);
      setIndex(userInfor.clickIndex);
      setProjectTitle(clickProject.title);
      setContributors(clickProject.contributors);
      setCategory(clickProject.category);
      setDescription(clickProject.description);
      setProjectLink(clickProject.link);
      axios
        .get("http://localhost:5000/comment/get", {
          params: {
            projectId: clickProject._id,
          },
        })
        .then((res) => {
          if (!res.data.success) {
            dispatch(storeClickProjectsComment([]));
          } else {
            dispatch(storeClickProjectsComment(res.data.comments));
          }
        })
        .catch((err) => {
          console.log("err");
        });
    }
    if (userInfor.checkLogin) {
      if (clickProject._id) {
        if (clickProject.ownerEmail === userInfor.email) {
          setOwner(true); //update
        } else {
          //view
          setOwner(false);
        }
      } else {
        //new project =>add project
        setOwner(true);
      }
    } else {
      //view
      setOwner(false);
    }
  }, []);

  const getComment = () => {
    const comment_package = {
      ownerCommentEmail: userInfor.email,
      projectId: clickProject._id,
      comments: comment,
    };

    axios
      .post("http://localhost:5000/comment/add", comment_package) //Update database
      .then((res) => {
        // if comment save/udpate successfully
        if (res.data.success) {
          setComment("");
          comments.push(comment_package);
          dispatch(storeClickProjectsComment(comments));
        } else {
          // user's profile isn't set up
          console.log("comment can not post!");
          setIsOpenFalse(true);
          setIsOpenTrue(false);
          setMessage(res.data.message);
        }
      })
      .catch(function (e) {
        console.log(e); // "oh, no!"
      });
  };

  const onDelete = () => {
    if (!validate()) return;
    console.log("delete hit");
    const id = clickProject._id;
    axios
      .delete(`http://localhost:5000/project/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          setIsOpenTrue(true);
          setIsOpenFalse(false);
          //console.log("action ", res.data.action);
          setMessage(res.data.message);
          setAction(res.data.action);
          setProjectTitle("");
          setContributors("");
          setCategory("");
          setDescription("");
          setProjectLink("");
          setIndex(-1);
          dispatch(storeClickProjects({}));
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
  };

  const onSubmit = () => {
    //console.log("update title", projectTitle);
    if (!validate()) return;

    /* Check if the current user is owner of clicked project */
    //console.log("click project owner email: ", clickProject.ownerEmail);
    //console.log("current user email: ", userInfor.email);
    const project = {
      ownerEmail: userInfor.email,
      title: projectTitle,
      contributors: contributors,
      category: category,
      description: description,
      link: projectLink,
      projectid: clickProject._id,
    };

    console.log("project id: ", project.projectid); //for test
    axios
      .post("http://localhost:5000/project/add", project) //Update database
      .then((res) => {
        // if project save/udpate successfully
        if (res.data.success) {
          setIsOpenTrue(true);
          setIsOpenFalse(false);
          //console.log("action ", res.data.action);
          setMessage(res.data.message);
          setAction(res.data.action);
          console.log("action: ", res.data.action);
          setProjectTitle("");
          setContributors("");
          setCategory("");
          setDescription("");
          setProjectLink("");
          setIndex(-1);
          dispatch(storeClickProjects({}));
        } else {
          // user's profile isn't set up
          console.log("Project can not save/update!");
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
    <div>
      <h1>{owner ? "Add/Update Project" : "View Project"}</h1>
      <div style={{ marginTop: -10 }}>
        <InputField
          label="Project Title"
          name="project_title"
          style={{ width: 880 }}
          variant="outlined"
          margin="dense"
          size="medium"
          disabled={!(index === -1 || owner)}
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          inputProps={{ style: { color: "black" } }}
          error={!!errors.projectTitle}
          helperText={errors.projectTitle ? errors.projectTitle : ""}
        />
      </div>
      <div style={{ marginTop: -70 }}>
        <InputField
          label="Contributors"
          name="contributors"
          style={{ width: 650 }}
          variant="outlined"
          margin="dense"
          disabled={!(index === -1 || owner)}
          size="medium"
          value={contributors}
          onChange={(e) => setContributors(e.target.value)}
          inputProps={{ style: { color: "black" } }}
          error={!!errors.contributors}
          helperText={errors.contributors ? errors.contributors : ""}
        ></InputField>
        <InputField
          fullWidth={false}
          label="Category"
          name="category"
          select
          style={{ width: 200 }}
          variant="outlined"
          margin="dense"
          disabled={!(index === -1 || owner)}
          size="medium"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          inputProps={{ style: { color: "black" } }}
          error={!!errors.category}
          helperText={errors.category ? errors.category : ""}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </InputField>
      </div>
      <div>
        <InputField
          label="Description"
          name="description"
          disabled={!(index === -1 || owner)}
          style={{ width: 880, marginTop: -60 }}
          multiline
          rows={10}
          variant="outlined"
          margin="dense"
          size="medium"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ style: { color: "black" } }}
          error={!!errors.description}
          helperText={errors.description ? errors.description : ""}
        />
      </div>
      <div>
        <InputField
          label="Project link(optional)"
          name="Project link"
          style={{ width: 880, marginTop: 125, marginBottom: 60 }}
          variant="outlined"
          margin="dense"
          disabled={!(index === -1 || owner)}
          size="medium"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          inputProps={{ style: { color: "black" } }}
        />
      </div>

      <div
        style={{
          marginTop: -50,
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {index !== -1 && owner && (
          <div>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Update
            </Button>

            <Button variant="contained" color="secondary" onClick={onDelete}>
              Delete
            </Button>
          </div>
        )}
        {index === -1 && (
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Finish
          </Button>
        )}
      </div>

      <div style={{ flexDirection: "column", display: "flex" }}>
        {index !== -1 && userInfor.email && (
          <div>
            {comments &&
              comments.map((comment) => (
                <InputField
                  label="comment"
                  name="comment "
                  disabled={true}
                  style={{ width: 880, marginBottom: "20px" }}
                  multiline
                  rows={10}
                  variant="outlined"
                  margin="dense"
                  size="medium"
                  value={comment.comments}
                  inputProps={{ style: { color: "black", height: "30px" } }}
                />
              ))}
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <InputField
                label="comment"
                name="comment"
                disabled={!(index !== -1 && userInfor.email)}
                style={{ width: 700, marginBottom: "20px", marginTop: "5px" }}
                multiline
                rows={10}
                variant="outlined"
                margin="dense"
                size="medium"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                inputProps={{ style: { color: "black", height: "30px" } }}
              />
              <Button variant="contained" color="primary" onClick={getComment}>
                Post
              </Button>
            </div>
          </div>
        )}
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
          {action === "updated" || action === "deleted" ? (
            <Link to="/portfolio">
              <Button
                variant="contained"
                color="primary"
                onClick={closeModalTrue}
              >
                Close
              </Button>
            </Link>
          ) : (
            <Link to="/add-project">
              <Button
                variant="contained"
                color="primary"
                onClick={closeModalTrue}
              >
                Close
              </Button>
            </Link>
          )}
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
export default AddProject;
