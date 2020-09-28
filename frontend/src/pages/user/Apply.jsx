import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { TextInput, TextEditor, DateTimeInput } from "../../components/inputs";
import { Box, Typography, Paper, Button, Divider } from "@material-ui/core";
import { Error } from "../../components/notifications";
import apis from "../../api";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { checkMimeType, checkFileSize } from "../../helpers/InputValidation";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(9),
    padding: theme.spacing(5),
    height: theme.spacing(80),
  },
  input: {
    display: "inline-block",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    //
  },
  label: {
    justifyItems: "bottom",
    textJustify: "right",
    fontWeight: "bolder",
    marginRight: theme.spacing(3),
  },
}));

function Apply(props) {
  // console.log(">>>>>>>>>>> " + props.auth.user._id);
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const { post_id } = useParams();

  const [app, setApp] = useState({
    post_id: post_id,
    fullname: "",
    email: "",
    resume: "",
    skills: "",
    phone: "",
    linkedlink: "",
    additional_info: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    resume: "",
    skills: "",
    phone: "",
    linkedlink: "",
    additional_info: "",
    file: "",
  });
  const [submission, setSubmission] = useState({
    language: "c_cpp",
    problem: "",
    file: {},
  });

  const handleChange = (prop) => (event) => {
    setApp({
      ...app,
      [prop]: event.target ? event.target.value : event, // this one is pretty tricky :)
    });
    setErrors({ ...errors, [prop]: "" });
  };

  const handlePost = async () => {
    await apis
      .addPost(app)
      .then((res) => props.history.push("/posts"))
      .catch((err) => {
        setErrors(err.response.data);
        console.log("here are the errors " + JSON.stringify(err.response.data));
      });
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    let fileValidation = checkMimeType(event, ["application/pdf"]);
    fileValidation =
      fileValidation === "" ? checkFileSize(event) : fileValidation;

    if (fileValidation === "") {
      setSubmission({ ...submission, file: files[0] });
      setErrors({ ...errors, file: "" });
    } else {
      setErrors({ ...errors, failed: true, file: fileValidation });
    }
    console.log(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (submission.file === undefined) {
      setErrors({ ...errors, file: "Please select a file" });
    } else {
      const data = new FormData();
      data.append("post_id", app.post_id);
      data.append("fullname", app.fullname);
      data.append("resume", app.resume);
      data.append("email", app.email);
      data.append("skills", app.skills);
      data.append("phone", app.phone);
      data.append("linkedlink", app.linkedlink);
      data.append("additional_info", app.additional_info);
      data.append("file", submission.file);
      await apis.apply(data).then(props.history.push("/"));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Intern Application
      </Typography>
      <Paper elevation={1} className={classes.root}>
        <Typography variant="h5" gutterBottom style={{ textAlign: "" }}>
          Fill the form carefully
        </Typography>
        <Divider />
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="body1">Full Name</Typography>
          <TextInput value={app.fullname} onChange={handleChange("fullname")} />
          <Error value={errors.fullname} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="body1">Email</Typography>
          <TextInput value={app.email} onChange={handleChange("email")} />
          <Error value={errors.email} />
        </Box>
        <Box className={classes.input} style={{ width: "98%" }}>
          <Typography variant="body1">Experience and Skills</Typography>
          <TextInput value={app.skills} onChange={handleChange("skills")} />
          <Error value={errors.skills} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="body1">Phone number</Typography>
          <TextInput value={app.phone} onChange={handleChange("phone")} />
          <Error value={errors.phone} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography variant="body1">LinkedIn account</Typography>
          <TextInput
            value={app.linkedlink}
            onChange={handleChange("linkedlink")}
          />
          <Error value={errors.linkedlink} />
        </Box>
        {/* <br /> */}
        <Box className={classes.input} style={{ width: "98%" }}>
          <Typography variant="body1">Addition infomation</Typography>

          <TextEditor
            value={app.additional_info}
            onChange={handleChange("additional_info")}
          />
          <Error value={errors.additional_info} />
        </Box>
        <Box className={classes.input} style={{ width: "49%" }}>
          <Typography
            variant="body1"
            // display="inline"
            // className={classes.label}
          >
            Resume:
          </Typography>
          <Button
            size="small"
            variant="contained"
            component="label"
            className={classes.textField}
            style={{ float: "left" }}
          >
            Upload File
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            display="inline"
            style={{ float: "left", padding: "10px", fontWeight: "bolder" }}
          >
            {submission.file.name}
          </Typography>
          <br />
          <Error value={errors.file} />
        </Box>

        <Box
          className={classes.input}
          style={{ display: "inline-block", marginLeft: "auto" }}
        >
          <Button
            variant="contained"
            style={{ marginLeft: "auto" }}
            onClick={handleSubmit}
          >
            submit
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

Apply.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Apply);
