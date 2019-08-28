import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../actions/auth";

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import NotFound from "./Layouts/NotFound";
import Landing from "./Layouts/Landing";
import Alert from "./Layouts/Alert";
import BlogShowcase from "./Blog/BlogShowcase";
import Blog from "./Blog/Blog";
import BlogAdd from "./Blog/BlogAdd";
import BlogEdit from "./Blog/BlogEdit";
import Login from "./Form/Login";
import Signup from "./Form/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const App = ({ auth }) => {
  useEffect(() => {
    auth();
  }, []);
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/blog" component={BlogShowcase} />
        <PrivateRoute exact path="/blog/add" component={BlogAdd} />
        <PrivateRoute exact path="/blog/edit/:id" component={BlogEdit} />
        <PrivateRoute exact path="/blog/show/:id" component={Blog} />
        <Route exact path="/" component={Landing} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default connect(
  null,
  { auth }
)(App);
