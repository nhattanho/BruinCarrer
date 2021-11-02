import React from "react";
/* Material UI */
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Modal from "react-modal";
const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white",
    "&:hover": {
      backgroundColor: "#0c0900",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
})(Button);
//used for modal
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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#0c0900",
  },
}));
// Prevent parent buttons from being triggered by clicks within children
const handleChildClick = (e) => {
  e.stopPropagation();
};

/* Main here */
export default function Bottom() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <Link to="/map" style={{ textDecoration: "none" }}>
            <BootstrapButton variant="outlined" color="primary" disableRipple>
              Site map
            </BootstrapButton>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <BootstrapButton variant="outlined" color="primary" disableRipple>
              Terms
            </BootstrapButton>
          </Link>
          <Link style={{ textDecoration: "none" }}>
            <BootstrapButton
              variant="outlined"
              color="primary"
              disableRipple
              onClick={toggleModal}
            >
              Privacy
              <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Testing123"
                style={customStyles}
              >
                <div style={{ textAlign: "center" }}>
                  You may view BruinCareer's privacy policy by visiting the
                  following:
                  <br />
                  <a
                    href="http://www.privacypolicies.com/live/1f55db1c-655a-42b0-877a-5324af8df0f0"
                    target="_blank"
                    style={{ textAlign: "center" }}
                    rel="noreferrer noopener"
                    onClick={handleChildClick} // allows for link to be opened in new tab
                  >
                    Privacy Policy
                  </a>
                  <div style={{ marginTop: "32px", fontSize: "smaller" }}>
                    Click anywhere to close
                  </div>
                </div>
              </Modal>
            </BootstrapButton>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <BootstrapButton variant="outlined" color="primary" disableRipple>
              Contact us
            </BootstrapButton>
          </Link>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <BootstrapButton variant="outlined" color="primary" disableRipple>
              About us
            </BootstrapButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
