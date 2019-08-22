import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, resetTask } from "../../actions";
import { withRouter } from "react-router";

const Header = ({ isAuth, userEmail, logout, resetTask, history }) => {
  const noUser = () => {
    return (
      <Fragment>
        <li>
          <Link to="/login">
            Login <i className="fas fa-sign-in-alt" />
          </Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </Fragment>
    );
  };

  const User = () => {
    const onClick = async () => {
      await logout();
      resetTask();
      history.push("/");
    };
    return (
      <Fragment>
        <li>
          <Link to="/tasks">{userEmail}</Link>
        </li>
        <li>
          <a href="#!" onClick={onClick}>
            Logout
          </a>
        </li>
      </Fragment>
    );
  };
  return (
    <div className="header">
      <div>
        <Link to="/" className="branding">
          My Task
        </Link>
      </div>
      <ul className="link-group">
        {!isAuth || userEmail === null ? noUser() : User()}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  userEmail: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, resetTask }
  )(Header)
);
