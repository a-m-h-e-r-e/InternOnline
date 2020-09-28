import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { TextInput } from "../../components/inputs";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
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
import { Dialog } from "../../components/notifications";
import Iframe from "react-iframe";

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

function ApplicantList(props) {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const { post_id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [filterType, setFilterType] = useState(3); // filter type of the

  const getPosts = async () => {
    await apis.getApplicants(post_id).then((cont) => {
      console.log(">>>>>>>>>>> " + cont.data.data);
      setApplicants(cont.data.data);
    });
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (value, _id) => {
    if (window.confirm(`Do tou want to delete the post ${_id} permanently?`)) {
      apis
        .deletePostById({ value }, _id)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  const handleChange = async (value, _id) => {
    apis.updateResult({ value }, _id).then(() => getPosts());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Applicant Lists
      </Typography>
      <Paper elevation={1} className={classes.root}>
        <Select
          variant="outlined"
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          // className={classes.root}
          style={{ margin: "10px", float: "right", width: "140px" }}
        >
          <MenuItem value={3}>
            <em>all</em>
          </MenuItem>

          <MenuItem value={0}>pending</MenuItem>

          <MenuItem value={1}>accepted</MenuItem>

          <MenuItem value={2}>rejected</MenuItem>
        </Select>
        <Typography
          variant="h6"
          display="inline"
          style={{ marginTop: "20px", float: "right" }}
        >
          Filter:
        </Typography>

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
                      filterType > 2 || row.accepted === filterType ? (
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
                            <Dialog
                              maxWidth="md"
                              openButtonName={`${
                                row.fullname.split(" ")[0]
                              }'s resume`}
                              title={"resume"}
                            >
                              <Paper elevation={1}>
                                <iframe
                                  // src={require("../../static/resumes/1599982920783-report-on-power-supply.pdf")}
                                  // src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&scrollbar=0"
                                  frameBorder="0"
                                  scro
                                  lling="auto"
                                  height="100%"
                                  width="100%"
                                ></iframe>
                                <embed
                                  // src={require("../../static/resumes/1599982920783-report-on-power-supply.pdf")}
                                  type="application/pdf"
                                  scrolling="auto"
                                  // src="https://docs.google.com/gview?url=https://path.com/to/your/pdf.pdf&embedded=true"
                                  style={{ width: "600px", height: "500px" }}
                                  frameBorder="0"
                                />
                              </Paper>
                            </Dialog>
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            {row.accepted === 1 ? (
                              <Typography
                                variant="subtitle2"
                                style={{ color: "green" }}
                              >
                                accepted
                              </Typography>
                            ) : null}
                            {row.accepted === 0 ? (
                              <Typography
                                variant="subtitle2"
                                style={{ color: "grey" }}
                              >
                                pending
                              </Typography>
                            ) : null}
                            {row.accepted === 2 ? (
                              <Typography
                                variant="subtitle2"
                                style={{ color: "red" }}
                              >
                                rejected
                              </Typography>
                            ) : null}
                          </StyledTableCell>
                          <StyledTableCell align={"center"}>
                            <Dialog
                              openButtonName="edit"
                              title={
                                "change " +
                                row.fullname.split(" ")[0] +
                                "'s application status to"
                              }
                            >
                              <Button
                                color="primary"
                                variant="outlined"
                                style={{
                                  margin: "10px",
                                  // backgroundColor: "green",
                                }}
                                onClick={() => handleChange(1, row._id)}
                              >
                                accept
                              </Button>
                              <Button
                                // color="secondary"
                                variant="outlined"
                                style={{ margin: "10px" }}
                                onClick={() => handleChange(0, row._id)}
                              >
                                pend
                              </Button>
                              <Button
                                color="secondary"
                                variant="outlined"
                                style={{ margin: "10px" }}
                                onClick={() => handleChange(2, row._id)}
                              >
                                reject
                              </Button>
                            </Dialog>
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

ApplicantList.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ApplicantList);
