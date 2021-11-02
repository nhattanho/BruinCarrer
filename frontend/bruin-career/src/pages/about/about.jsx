import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { borders } from '@material-ui/system';
import Typography from "@material-ui/core/Typography";
//import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: "24px",
  },
  wrapperDiv: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
  text: {
    textAlign: "left",
    display: "block",
    marginTop: "72px",
    fontWeight: "Light",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3" className={classes.header}>
        BruinCareer is created by students, to help students
        <div className={classes.wrapperDiv}>
          <div className={classes.text}>
            <Typography variant="h5">
              Following the effects of Covid-19, many students and graduates
              have found it challenging to find a job or internship as companies
              are forced to cut back on labor costs through hiring freezes and
              other means. As a stretch goal, a team of dedicated computer
              science students at UCLA have set out to create a platform that
              focuses on peer learning, networking, and personal development to
              help students show recruiters their experience and projects. Our
              goal is to serve as a gateway to bring students and recruiters
              closer together in order to connect students with their dream
              jobs.
              {/* <div>Following the effects of Covid-19, many students and graduates have found it challenging to find a job</div>
                            <div>or internship as companies are forced to cut back on labor costs through hiring freezes and other means.</div>
                            <div>As a stretch goal, a team of dedicated computer science students at UCLA have set out to create a platform that focuses</div>
                            <div>on peer learning, networking, and personal development to help students show recruiters their experience and projects.</div>
                            <div>Our goal is to serve as a gateway to bring students and recruiters closer together in order to connect students with their dream jobs.</div> */}
            </Typography>
          </div>
        </div>
      </Typography>
    </div>
  );
};

export default About;
