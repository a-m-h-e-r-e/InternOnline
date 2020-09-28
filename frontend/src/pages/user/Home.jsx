import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import parse from "html-react-parser";
import { TextInput, AutoCompleteInput } from "../../components/inputs";
import {
  Box,
  Typography,
  Button,
  Paper,
  CardHeader,
  Collapse,
  IconButton,
  Divider,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";
import Autosuggest from "react-autosuggest";

import {
  StyledTableRow,
  StyledTableCell,
} from "../../components/dataDisplay/TableDisplay";
import apis from "../../api";
import { setThemeMode } from "../../redux/actions/themeMode";
import { getRemainingTime } from "../../helpers/DateHelpers";
import ShadeTextFieldStyle from "./Temp";

const rowName = [
  "Title",
  "Field",
  "Start date",
  "End date",
  "Place",
  "Description",
];

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),

    minHeight: theme.spacing(70),
  },
  search: {
    width: "80%",
    margin: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    // display: "inline-block",
    // margin: "auto",
  },
  card: {
    display: "flex",
    maxWidth: "97%",
    height: theme.spacing(18),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  cardImage: {
    width: 200,
  },
  details: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    paddingBottom: theme.spacing(0),
  },
  cardContent: {
    flex: "1 0 auto",
    width: "100%",
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  input: {
    marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(10),
  },
  expand: {
    transform: "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  table: {
    borderColor: theme.palette.primary.light,
  },
}));

function Home(props) {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState([]);
  const [details, setDetails] = useState("");
  const [cityFilter, setCityFilter] = useState("any"); // filter type of the
  const [fieldFilter, setFieldFilter] = useState("any"); // filter type of the
  const [typeFilter, setTypeFilter] = useState("any"); // filter type of the
  const [filter, setFilter] = useState(false);
  const getAllPosts = async () => {
    await apis
      .getAllPosts()
      .then((cont) => {
        setPosts(cont.data.data);
      })
      .catch((err) => console.log(err));
  };

  const SearchPosts = async () => {
    await apis
      .searchPosts(search)
      .then((res) => {
        setPosts(res.data.data);
        setFilter(true);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (!searching) getAllPosts();
    console.log(search);
  }, []);

  React.useEffect(() => {
    setSearching(true);
  }, [search]);
  // React.useEffect(() => {
  //   if (search !== "") setFilter(true);
  // }, [search]);

  React.useEffect(() => {
    console.log("the selected--- " + search);
    if (selected) setSearch(selected.title + "," + selected.name);
  }, []);

  React.useEffect(() => {
    if (details === "") setDetails(posts ? posts.description : "");
  }, [posts]);

  return (
    <div>
      <Typography
        color="secondary"
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        Discover new intern jobs
      </Typography>
      <Paper elevation={3} className={classes.search}>
        <div style={{ margin: "auto", width: "80%", marginTop: "30px" }}>
          <div
            style={{ display: "inline-block", width: "100%", margin: "auto" }}
          >
            <Typography variant="h6" color="textSecondary" display="inline">
              Search by Title, Field, skill, Company or location
            </Typography>
            <AutoCompleteInput
              search={search}
              setSelected={setSelected}
              setSearch={setSearch}
              freeSolo={true}
              label="search"
              multiple={false}
              getOptionSelected={(option, value) =>
                option.title === value.title
              }
              getOptionLabel={(option) =>
                option.title +
                ", " +
                option.field +
                ", " +
                option.location +
                ", " +
                option.name
              }
              apiFetch={searchPosts}
              // onChange={(event) => handleChange()}
            />
          </div>
          <Button
            onClick={SearchPosts}
            variant="contained"
            color="secondary"
            style={{
              display: "block",
              margin: "auto",
              height: "41px",
              marginTop: "10px",
            }}
          >
            Search
          </Button>
        </div>
      </Paper>
      {filter ? (
        <React.Fragment>
          <Box
            style={{
              marginTop: "10px",
              marginLeft: "150px",
              display: "inline-block",
            }}
          >
            <Typography
              variant="subtitle2"
              // display="inline"
              // style={{ marginTop: "0px", marginLeft: "150px" }}
            >
              City:
            </Typography>
            <Select
              // helpertext="wooo"
              margin="dense"
              variant="outlined"
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
              // className={classes.root}
              style={{ marginLeft: "0px", width: "140px" }}
            >
              <MenuItem value={"any"}>
                <em>any</em>
              </MenuItem>
              <MenuItem value={"Addis Abeba"}>Addis Abeba</MenuItem>
              <MenuItem value={"Bishoftu"}>Bishoftu</MenuItem>
              <MenuItem value={"Mekele"}>Mekele</MenuItem>
            </Select>
          </Box>
          <Box
            style={{
              marginTop: "10px",
              marginLeft: "15px",
              display: "inline-block",
            }}
          >
            <Typography
              variant="subtitle2"
              // display="inline"
              // style={{ marginTop: "0px", marginLeft: "150px" }}
            >
              Field:
            </Typography>
            <Select
              // helpertext="wooo"
              margin="dense"
              variant="outlined"
              value={fieldFilter}
              onChange={(event) => setFieldFilter(event.target.value)}
              // className={classes.root}
              style={{ marginLeft: "0px", width: "140px" }}
            >
              <MenuItem value={"any"}>
                <em>any</em>
              </MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
              <MenuItem value={"Applied Science"}>Applied Science</MenuItem>
            </Select>
          </Box>
          <Box
            style={{
              marginTop: "10px",
              marginLeft: "15px",
              display: "inline-block",
            }}
          >
            <Typography
              variant="subtitle2"
              // display="inline"
              // style={{ marginTop: "0px", marginLeft: "150px" }}
            >
              Type:
            </Typography>
            <Select
              // helpertext="wooo"
              margin="dense"
              variant="outlined"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              // className={classes.root}
              style={{ marginLeft: "0px", width: "140px" }}
            >
              <MenuItem value={"any"}>
                <em>any</em>
              </MenuItem>
              <MenuItem value={"full time"}>full time</MenuItem>
              <MenuItem value={"part time"}>part time</MenuItem>
              <MenuItem value={"remote"}>remote</MenuItem>
            </Select>
          </Box>
        </React.Fragment>
      ) : null}

      <Box elevation={0} className={classes.root}>
        <Grid container>
          <Grid item md={6}>
            {posts
              ? posts.map((item, index) =>
                  // cityFilter !== "any" ?
                  //   item.location === cityFilter
                  //  : true
                  (cityFilter === "any"
                    ? true
                    : item.location === cityFilter) &&
                  (fieldFilter === "any" ? true : item.field === fieldFilter) &&
                  (typeFilter === "any" ? true : item.type === typeFilter) ? (
                    <div key={index}>
                      <Card elevation={1} className={classes.card} key={index}>
                        <CardMedia
                          component="img"
                          alt={item.title}
                          // height="240"
                          className={classes.cardImage}
                          image={require("../../static/image/a.jpg")}
                          // image={require("../../../backend/submissions")}
                          title={item.title}
                        />
                        <div className={classes.details}>
                          <CardActionArea
                            style={{ height: "100%" }}
                            onClick={() => setDetails(item.description)}
                          >
                            <CardHeader
                              title={
                                <Typography
                                  variant="h6"
                                  color="primary"
                                  style={{ lineHeight: "20px" }}
                                >
                                  {item.title}
                                </Typography>
                              }
                              subheader={
                                <React.Fragment>
                                  <Typography
                                    style={{
                                      fontWeight: "bold",
                                      color: "#2e2b28",
                                    }}
                                    variant="body1"
                                    // color="textSecondary"
                                    display="inline"
                                  >
                                    {item.name} {"  "}|{" "}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    // color="textSecondary"
                                    display="inline"
                                  >
                                    {item.location}
                                  </Typography>
                                </React.Fragment>
                              }
                              className={classes.cardHeader}
                            />

                            <CardContent className={classes.cardContent}>
                              <Typography
                                variant="body2"
                                style={{ fontWeight: "bold" }}
                                color="textSecondary"
                              >
                                {item.field}
                              </Typography>
                              <Typography variant="subtitle2" display="inline">
                                Posted{" "}
                                {getRemainingTime(item.createdAt, new Date())}
                              </Typography>
                              {"  "}-{"  "}
                              <Typography variant="subtitle2" display="inline">
                                {item.applicants} applicants
                              </Typography>
                              {/* <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          display="inline"
                        >
                          {new Date(item.start_date).toLocaleString()}
                        </Typography>
                        {"   "}to{"   "}
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          display="inline"
                        >
                          {new Date(item.end_date).toLocaleString()}
                        </Typography> */}
                            </CardContent>

                            {/* <Divider /> */}
                            <Divider
                              variant="middle"
                              // style={{ width: "90%", margin: "10px" }}
                            />
                            <CardActions
                              disableSpacing
                              style={{ padding: 0, paddingLeft: "10px" }}
                            >
                              {/* <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton> */}

                              <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                component={Link}
                                to={`/apply/${item._id}`}
                                style={{
                                  marginLeft: "auto",
                                  marginRight: "10px",
                                  marginBottom: "5px",
                                  marginTop: "5px",
                                  float: "left",
                                  // zIndex: 2,
                                }}
                              >
                                APPLY
                              </Button>
                              {/* <Button
                    size="small"
                    color="primary"
                    onClick={handleExpandClick}
                    >
                    Learn More
                  </Button> */}
                            </CardActions>
                            {/* <Divider /> */}
                          </CardActionArea>
                        </div>
                      </Card>

                      {/* <Divider
                      variant="middle"
                      style={{ width: "90%", margin: "10px" }}
                    /> */}
                    </div>
                  ) : null
                )
              : null}
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: "10px" }}
            />
          </Grid>
          <Grid item md={6}>
            <Paper
              elevation={2}
              style={{ padding: "30px", overflowY: "auto", maxHeight: "660px" }}
            >
              <Typography variant="h4">Details</Typography>
              <Divider />
              <Typography paragraph>
                {details ? parse("" + details) : ""}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

const searchPosts = async (payload) => {
  let result = [];
  await apis
    // .searchPosts(payload)
    .getAllPosts(payload)
    .then((res) => {
      let temp = res.data.data;
      result = temp.map((item, index) => {
        return {
          _id: item._id,
          title: item.title,
          name: item.name,
          field: item.field,
          location: item.location,
        };
      });
    })
    .catch((err) => console.log(err));
  return result;
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Home);
