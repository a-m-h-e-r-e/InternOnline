import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { TextInput } from "../../components/inputs";
import { Box, Typography, Button, Paper } from "@material-ui/core";
import { Link, useRouteMatch, useParams } from "react-router-dom";

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
  "Fullname",
  "Skills",
  "Email",
  "Phone",
  "Resume",
  "Status",
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

function AcceptedApplicantList(props) {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const { post_id } = useParams();

  const [applicants, setApplicants] = useState([]);

  const getPosts = async () => {
    await apis.getApplicants(post_id).then((cont) => {
      setApplicants(cont.data.data);
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
        Accepted Applicants List
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
                {applicants !== undefined
                  ? applicants.map((row, index) =>
                      row.accepted ? (
                        <StyledTableRow key={index}>
                          <StyledTableCell align={"center"}>
                            <Typography
                              variant="body2"
                              color="primary"
                              style={{ fontWeight: "bold" }}
                            >
                              {row.fullname}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            {row.skills}
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            {/* {row.start_date} */}
                            <Typography
                              variant="body2"
                              // color="secondary"
                              style={{ fontSize: "13px" }}
                            >
                              {row.email}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align={"center"}>
                            {row.phone}
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            <Button
                              color="primary"
                              // variant="outlined"
                              size="small"
                              style={{
                                marginRight: "5px",
                                textTransform: "none",
                              }}
                              component={Link}
                              to={`${url}/editpost/${row._id}`}
                            >
                              {row.fullname.split(" ")[0]}'s resume
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            {row.accepted ? (
                              <Typography
                                variant="subtittle2"
                                style={{ color: "green" }}
                              >
                                accepted
                              </Typography>
                            ) : (
                              <Typography variant="subtitle2">
                                pending
                              </Typography>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            <Button
                              color="secondary"
                              variant="outlined"
                              size="small"
                              onClick={() => handleDelete(row._id)}
                            >
                              remove
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : null
                    )
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </div>
  );
}

AcceptedApplicantList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(AcceptedApplicantList);
