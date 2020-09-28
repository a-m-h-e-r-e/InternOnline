import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import { TextInput, TextEditor, DateTimeInput } from "../../components/inputs";
import { Box, Typography, Paper, Button } from "@material-ui/core";
import { Error } from "../../components/notifications";
import apis from "../../api";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(9),
    padding: theme.spacing(5),
    height: theme.spacing(70),
  },
  input: {
    display: "inline-block",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    // marginLeft: theme.spacing(10),
  },
}));

function EditPost(props) {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const { post_id } = useParams();
  React.useEffect(() => {
    async function getPost() {
      await apis.getPostById(post_id).then((cont) => {
        setPost(cont.data.data);
      });
    }
    getPost();
  }, []);

  React.useEffect(() => console.log(JSON.stringify(post)));

  const [post, setPost] = useState({});

  const [errors, setErrors] = useState({
    title: "",
    field: "",
    location: "",
    startDate: null,
    endDate: null,
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setPost({
      ...post,
      [prop]: event.target ? event.target.value : event, // this one is pretty tricky :)
    });
    setErrors({ ...errors, [prop]: "" });
  };

  const handlePost = async () => {
    await apis
      .updatePostById(post_id, post)
      .then((res) => {
        window.alert("updated succeffuly!");
        props.history.push("/posts");
      })
      .catch((err) => {
        setErrors(err.response.data);
        console.log("here are the errors " + JSON.stringify(err.response.data));
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Edit Post
      </Typography>
      <Paper elevation={1} className={classes.root}>
        <Box className={classes.input} style={{ width: "98%" }}>
          <Typography variant="h6">Title</Typography>
          <TextInput value={post.title} onChange={handleChange("title")} />
          <Error value={errors.title} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="h6">Field</Typography>
          <TextInput value={post.field} onChange={handleChange("field")} />
          <Error value={errors.field} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="h6">Location</Typography>
          <TextInput
            value={post.location}
            onChange={handleChange("location")}
          />
          <Error value={errors.location} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="h6">Starting Date</Typography>
          <DateTimeInput
            value={post.start_date}
            onChange={handleChange("start_date")}
          />
          <Error value={errors.start_date} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="h6">Ending Date</Typography>
          <DateTimeInput
            value={post.end_date}
            onChange={handleChange("end_date")}
          />
          <Error value={errors.end_date} />
        </Box>
        <Box className={classes.input} style={{ width: "98%" }}>
          <Typography variant="h6">Description</Typography>
          <TextEditor
            value={post.description}
            onChange={(prop) => handleChange("description")}
          />
          <Error value={errors.description} />
        </Box>
        <Box className={classes.input}>
          <Button variant="contained" onClick={handlePost}>
            post
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

EditPost.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(EditPost);
