import React from "react";

/* Import Redux */
import { useDispatch, useSelector } from "react-redux";
import { storeClickProjects, storeCheckLogin } from "../../redux/redux";
/* Material UI */
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

/* logo image */
import logo from "./images/logobruin.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

/* Main here */
export default function Header() {
  /* Use Redux */
  const checkLogin = useSelector((state) => state.checkLogin);
  const username = useSelector((state) => state.username);
  const dispatch = useDispatch();
  const resetClickProject = () => {
    dispatch(storeClickProjects({}, -1));
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const setLogout = () => {
    dispatch(storeCheckLogin(false));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {checkLogin ? (
        <AppBar position="static" color="transparent">
          <Toolbar className={classes.header}>
            <Link to="/">
              <IconButton>
                <Avatar
                  alt="bruincareer"
                  src={logo}
                  className={classes.large}
                />
              </IconButton>
            </Link>
            <Link to="/portfolio" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetClickProject}
              >
                Portfolio
              </Button>
            </Link>
            <Link to="/add-project" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetClickProject}
              >
                Project
              </Button>
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetClickProject}
              >
                Home
              </Button>
            </Link>
            <IconButton aria-label="show 17 new notifications" color="primary">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon color="primary" fontSize="large" />
                <Typography variant="h6" color="primary">
                  {username}
                </Typography>
              </IconButton>
            </Link>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <Button
                  size="small"
                  color="primary"
                  onClick={setLogout}
                  style={{ marginRight: 30 }}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" color="transparent">
          <Toolbar className={classes.header}>
            <Link to="/">
              <IconButton>
                <Avatar
                  alt="bruincareer"
                  src={logo}
                  className={classes.large}
                />
              </IconButton>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Register
              </Button>
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Home
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
