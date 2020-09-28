import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { connect } from "react-redux";
import { setThemeMode } from "../../redux/actions/themeMode";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#247BA0",
    marginBottom: "60px", //the margin below the navigation bar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  title: {
    flexGrow: 1,
    fontWeight: "bolder",
    margin: "auto",
  },
  navMenu: {
    marginRight: theme.spacing(2),
  },

  active: {
    marginRight: theme.spacing(2),
    color: "#247BA0",
    // color: "#000000",
    backgroundColor: "#EEEEEE",
  },

  // styles used for the drawer
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250, // the width used for the drawer
  },
  fullList: {
    width: "auto", // the width used for the drawer
  },
  navMenuMobile: {
    width: "100%",
  },
  activeMobile: {
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#247BA0",
  },
}));

// the customized button used for the navbar
const ColorButton = withStyles((theme) => ({
  root: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#EEEEff",
      color: "#247BA0",
    },
  },
}))(Button);

// the NavBar as a functional component
function ButtonAppBar(props) {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const drawerMenus = props.menus;
  const anchor = "left"; // postion of the drawer left, right, bottom and top

  const [state, setState] = React.useState({
    left: false, // state of the drawer
    top: false,
    bottom: false,
    right: false,
  });

  const [active, setActive] = React.useState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // here is the actual drawer representation saved as list
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* the list */}
      <List>
        <ListItem key="logo-title">
          <Typography
            variant="h6"
            className={classes.title}
            style={{ textAlign: "center" }}
          >
            {props.drawer.title}
          </Typography>
        </ListItem>

        <Divider />

        {drawerMenus.map((menu) => {
          return (
            <ListItem key={menu.name} style={{ width: "100%" }}>
              <ColorButton
                color="inherit"
                className={
                  // claseName asigned based on the active link(route)
                  active === menu.link
                    ? classes.activeMobile
                    : classes.navMenuMobile
                }
                to={menu.link} // the refered link (route)
                component={Link}
              >
                <ListItemIcon color="transparent">{menu.icon}</ListItemIcon>
                <ListItemText>{menu.name}</ListItemText>
              </ColorButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <List>
        {["login", "sing up"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    // the actual NavBar
    <div className={classes.root}>
      <Hidden smUp>
        <IconButton
          onClick={toggleDrawer(anchor, true)} // onclick opens the drawer by calling teh toggleDrawer function
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        {/* the drawer is displayed here */}
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </Hidden>
    </div>
  );
}

ButtonAppBar.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

const mapStateToProps = (state) => {
  return {
    themeMode: state.themeModeReducer.themeMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onThemeModeClick: (value) => {
      dispatch(setThemeMode(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(ButtonAppBar));
