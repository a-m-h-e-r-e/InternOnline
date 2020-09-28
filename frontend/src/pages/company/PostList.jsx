import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { TextInput } from "../../components/inputs";
import { Box, Typography, Button, Paper } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  StyledTableRow,
  StyledTableCell,
} from "../../components/dataDisplay/TableDisplay";
import apis from "../../api";

const rowName = [
  "Title",
  "Field",
  "Start date",
  "End date",
  "Place",
  "Applicants",
  "Edit",
];

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),

    minHeight: theme.spacing(70),
  },

  input: {
    marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(10),
  },
  table: {
    borderColor: theme.palette.primary.light,
  },
}));

function PostList(props) {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await apis.getPosts(props.auth.user._id).then((cont) => {
      console.log(">>>>>>>>>>> " + cont.data.data);
      setPosts(cont.data.data);
    });
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (prop) => {
    if (window.confirm(`Do tou want to delete the post ${prop} permanently?`)) {
      apis
        .deletePostById(prop)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Your Recent Post
      </Typography>
      <Paper elevation={1} className={classes.root}>
        <Button variant="outlined" component={Link} to={`${url}/addpost`}>
          Add post
        </Button>

        <Box className={classes.input}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {rowName.map((item, index) => {
                    return (
                      <StyledTableCell key={item} align="center">
                        {item}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts !== undefined
                  ? posts.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align={"left"}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ fontWeight: "bold" }}
                          >
                            {row.title}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          {row.field}
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          {/* {row.start_date} */}
                          <Typography
                            variant="body2"
                            // color="secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {new Date(row.start_date).toLocaleString("en-US", {
                              // weekday: "short",
                              month: "short",
                              year: "numeric",
                              day: "numeric",
                            })}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          <Typography
                            variant="body2"
                            // color="secondary"
                            style={{ fontSize: "13px" }}
                          >
                            {new Date(row.end_date).toLocaleString("en-US", {
                              // weekday: "short",
                              month: "short",
                              year: "numeric",
                              day: "numeric",
                            })}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          {row.location}
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          <Button
                            color="primary"
                            // variant="outlined"
                            size="small"
                            style={{
                              textAlignment: "center",
                              marginRight: "5px",
                              fontSize: "10px",
                            }}
                            component={Link}
                            to={`${url}/applicants/${row._id}`}
                          >
                            {row.applicants} applicants
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align={"left"}>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{ marginRight: "5px", marginBottom: "5px" }}
                            component={Link}
                            to={`${url}/editpost/${row._id}`}
                          >
                            edit
                          </Button>
                          <Button
                            color="secondary"
                            variant="outlined"
                            size="small"
                            onClick={() => handleDelete(row._id)}
                          >
                            delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </div>
  );
}

PostList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PostList);
