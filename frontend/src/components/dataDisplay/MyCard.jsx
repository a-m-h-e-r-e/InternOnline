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
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },

  // root: {
  //   width: "300px",
  //   height: "500px",
  //   border: "1px solid",
  //   borderColor: theme.palette.primary.main,
  // },
  // header: {
  //   width: "100%",
  //   height: "60px",
  //   color: theme.palette.common.white,
  //   // borderBottom: "1px solid",
  //   // borderBottomColor: theme.palette.primary.main,
  //   backgroundColor: theme.palette.primary.light,
  //   // borderRadius: "3%",
  //   // WebkitBorderTopRightRadius: "3%",
  //   // WebkitBorderTopLeftRadius: "50% 50%",
  // },
  // body: {
  //   width: "100%",
  //   height: "400px",
  // },
  // footer: {
  //   width: "100%",
  //   height: "40px",
  //   borderTop: "1px solid",
  //   borderTopColor: theme.palette.primary.main,
  // },
}));

export default function MyCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        // avatar={<Avatar />}
        // action={
        //   <IconButton>
        //     <DeleteIcon />
        //   </IconButton>
        // }
        // title={<Link to={"/user/"}></Link>}
        // subheader={new Date().toDateString()}
        className={classes.cardHeader}
      >
        <Typography component="p" className={classes.text}>
          asdfasf
        </Typography>
      </CardHeader>
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          The body
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          className={classes.button}
          aria-label="Like"
          color="secondary"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          aria-label="Unlike"
          color="secondary"
        >
          <FavoriteBorderIcon />
        </IconButton>
        <span>12</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>{" "}
        <span>12</span>
      </CardActions>
    </Card>
    // <Paper className={classes.root} elevation={6}>
    //   <Box className={classes.header}>dfdf</Box>
    //   <Box className={classes.body}></Box>
    //   <Box className={classes.footer}></Box>
    // </Paper>
  );
}

// import React from "react";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import parse from "html-react-parser";
// import { Paper } from "@material-ui/core";

// const useStyle = makeStyles((theme) => ({
//   root: {
//     height: "950px",
//     width: "800px",
//   },
//   header: {
//     height: "50px",
//     width: "100%",
//     backgroundColor: theme.palette.success.light,
//     //  borderBottom: "3px solid",
//     borderBottomStyle: "groove",
//     borderBottomColor: theme.palette.primary.dark,
//   },
// }));
// export default function Default(props) {
//   const classes = useStyle();
//   return (
//     <Paper elevation={0} className={classes.root}>
//       <Box className={classes.header}></Box>
//       <Box className={classes.body}></Box>
//       <Box className={classes.footer}></Box>
//     </Paper>
//   );
// }
