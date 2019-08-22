import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import NotFound from "./Layouts/NotFound";
import Landing from "./Layouts/Landing";
import Tasks from "./Tasks";
import Login from "./Login";
import Signup from "./Signup";
import Alert from "./Alert";
import { auth, getTasks } from "../actions";

class App extends React.Component {
  async componentDidMount() {
    await this.props.auth();
    await this.props.getTasks();
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isAuth === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    return (
      <Router>
        <Header />
        <Alert />
        <PrivateRoute exact path="/tasks" component={Tasks} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Landing} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    auth,
    getTasks
  }
)(App);
