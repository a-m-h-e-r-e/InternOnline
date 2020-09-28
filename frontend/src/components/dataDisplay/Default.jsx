import React, { useState, useEffect } from "react";
// import auth from "./../auth/auth-helper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Paper, Box } from "@material-ui/core";
// import { remove, like, unlike } from "./api-post.js";
// import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    // width: "300px",
    // height: "500px",
    border: "2px solid",
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    padding: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    fontWeight: "bolder",
    // height: "60px",
    color: theme.palette.common.white,
    // borderBottom: "2px solid",
    // borderBottomColor: theme.palette.divider,
  },
  body: {
    padding: theme.spacing(3),
    width: "100%",
    // height: "400px",
    backgroundColor: theme.palette.primary.lighter,

    // backgroundColor: theme.palette.background.default,
  },
  footer: {
    width: "100%",
    // height: "40px",
    // borderTop: "2px solid",
    // borderTopColor: theme.palette.divider,
  },
}));

export default function MyCard(props) {
  const classes = useStyles();
  const { header, body, footer, elevation } = props;
  return (
    <Paper className={classes.root} elevation={elevation}>
      <Box className={classes.header}>{header}</Box>
      <Box className={classes.body}>{body}</Box>
      <Box className={classes.footer}>{footer}</Box>
    </Paper>
  );
}
