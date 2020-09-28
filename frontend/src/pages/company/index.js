import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

import { NavBar } from "../../components";
import Posts from "./Posts";
import { Grid, Box } from "@material-ui/core";
import HotelIcon from "@material-ui/icons/HotelRounded";
import CarIcon from "@material-ui/icons/LocalTaxiRounded";
import TravelIcon from "@material-ui/icons/Explore";
import PageNotFound from "../PageNotFound";
import ApplicantList from "./ApplicantList";
import AcceptedApplicantList from "./AcceptedApplicantList";
const navigationMenus = [
  { name: "Posts", link: "/company/posts", icon: <TravelIcon /> },
  { name: "Requests", link: "/company/applicantlist", icon: <HotelIcon /> },
  { name: "Accepted", link: "/company/accepted", icon: <CarIcon /> },
];

function Company() {
  // theme mode to toggle between light and dark
  const [lightMode, setLightMode] = useState(true);
  let { path, url } = useRouteMatch();

  const handleLightMode = () => {
    setLightMode((prev) => !prev);
  };

  return (
    <Router>
      <NavBar
        menus={navigationMenus}
        lightMode={false}
        handleLightMode={handleLightMode}
      />
      <div style={{ marginLeft: "100px", marginRight: "100px" }}>
        <Grid container>
          <Grid item md={11}>
            <Switch>
              <Route
                path={`${path}/posts/applicants/:post_id`}
                component={ApplicantList}
              />
              <Route
                path={`${path}/posts/accepted/:post_id`}
                component={AcceptedApplicantList}
              />
              <Route path={`${path}/posts`} component={Posts} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Grid>
          {/* <Grid item md={3}></Grid> */}
        </Grid>
      </div>
    </Router>
  );
}

export default Company;
