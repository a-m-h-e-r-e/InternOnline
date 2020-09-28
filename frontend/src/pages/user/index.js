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
import { Grid, Box } from "@material-ui/core";
import HotelIcon from "@material-ui/icons/HotelRounded";
import CarIcon from "@material-ui/icons/LocalTaxiRounded";
import TravelIcon from "@material-ui/icons/Explore";
import PageNotFound from "../PageNotFound";
import Home from "./Home";
import Apply from "./Apply";

const navigationMenus = [
  { name: "Home", link: "/", icon: <TravelIcon /> },
  { name: "About us", link: "/aboutus", icon: <HotelIcon /> },
  { name: "Contact us", link: "/contactus", icon: <CarIcon /> },
];

function User() {
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
      <div style={{ margin: "auto" }}>
        {/* <Grid container>
          <Grid item md={11}> */}
        <Switch>
          <Route path={`/apply/:post_id`} component={Apply} />
          <Route path={`/`} component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        {/* </Grid> */}
        {/* <Grid item md={3}></Grid> */}
        {/* </Grid> */}
      </div>
    </Router>
  );
}

export default User;
