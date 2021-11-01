import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import image from "./images/example.png"

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

const Home = (props) => {
  const [value, setValue] = useState('');  //Input Field value
  return (
    <div>
      <div className="search-wrapper">
        <InputField
          fullWidth={true}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Search user/project/category"
          name="search"
          required
          autoComplete="Search user/project/category"
          variant="outlined"
          margin="dense"
          size="medium"
          inputProps={{ style: { color: "black" } }}
        />
      </div>
      <h1>Featured Projects</h1>
      <div className="project-list">
        <div className="proj1">
          <Link to="/project">
              <button className="project-card">
              <img id="proj1" src={image}/>
            </button>
          </Link>
        </div>
        <div className="proj2">
        <Link to="/project">
            <button className="project-card">
              <img id="proj2" src={image}/>
            </button>
          </Link>
        </div>
        <div className="proj3">
        <Link to="/project">
            <button type="button" className="project-card">
              <img id="proj3" src={image}/>
            </button>
          </Link>
        </div>
        <div className="proj4">
        <Link to="/project">
            <button type="button" className="project-card">
              <img id="proj4" src={image}/>
            </button>
          </Link>
        </div>
      </div>
      <Link to="/" style={{textDecoration: 'none'}}>
      <div className="see-more">
        See more
      </div>
      </Link>
      <h1>Browse By Category</h1>
      <div className="category-list">
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className="category-card category-title">
          Engineering
        </div>
        </Link>
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className="category-card category-title">
          <p>Business</p>
        </div>
        </Link>
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className="category-card category-title">
          <p>Arts</p>
        </div>
        </Link>
        <Link to="/" style={{textDecoration: 'none'}}>
        <div className="category-card category-title">
          <p>Science</p>
        </div>
        </Link>
      </div>
      <Link to="/" style={{textDecoration: 'none'}}>
      <div className="see-more">
        See more
      </div>
      </Link>
    </div>
  );
};

export default Home;
