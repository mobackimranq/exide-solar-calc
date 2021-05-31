/* eslint-disable react/jsx-key */
import React, { lazy } from "react";
import AuthorizedRoute from "base-shell/lib/components/AuthorizedRoute/AuthorizedRoute";
import UnauthorizedRoute from "base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute";
import { Route } from "react-router-dom";

const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const AdminSignin = lazy(() => import("../pages/AdminSignIn/AdminSignIn"));
const ConsumerData = lazy(() => import("../pages/ConsumerData"));
const About = lazy(() => import("../pages/About"));
const Home = lazy(() => import("../pages/Home/Home"));
const EstimationTool = lazy(() =>
  import("../pages/EstimationTool/EstimationTool")
);

const MyAccount = lazy(() => import("../pages/MyAccount/MyAccount"));

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute
    path="/adminsignin"
    redirectTo="/"
    exact
    component={AdminSignin}
  />,

  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/consumer_data" exact component={ConsumerData} />,
  <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/estimation_tool" exact component={EstimationTool} />,
];

export default routes;
