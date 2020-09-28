import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

import PostList from "./PostList";
import AddPost from "./AddPost";
import { Typography, Paper, Button } from "@material-ui/core";
import { useState } from "react";
import EditPost from "./EditPost";

const useStyle = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  root: {
    padding: theme.spacing(3),
  },
}));

export default function Posts() {
  const classes = useStyle();
  let { path, url } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/addpost`} component={AddPost} />
        <Route path={`${path}/editpost/:post_id`} component={EditPost} />
        <Route path={`${path}`} exact component={PostList} />
      </Switch>
    </div>
  );
}
