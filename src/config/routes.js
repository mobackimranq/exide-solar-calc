/* eslint-disable react/jsx-key */
import React, { lazy } from "react";

import { Route } from "react-router-dom";

const About = lazy(() => import("../pages/About"));
const Home = lazy(() => import("../pages/Home/Home"));

const routes = [
  <Route path="/about" exact component={About} />,
  <Route path="/home" exact component={Home} />,
];

export default routes;
