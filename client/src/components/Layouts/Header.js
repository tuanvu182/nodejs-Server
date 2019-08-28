import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { withRouter } from "react-router-dom";

const Header = ({ auth, loading, user, logout, history }) => {
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

  const User = ({ user, logout, history }) => {
    const onClick = async () => {
      history.push("/");
      await logout();
    };
    return (
      <Fragment>
        <li>
          <Link to="/blog">{user}</Link>
        </li>
        <li>
          <a onClick={onClick} href="#!">
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
          My Blog
        </Link>
      </div>
      <ul className="link-group">
        {!auth && loading === false
          ? noUser()
          : User({ user, logout, history })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth.auth,
  loading: state.auth.loading,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Header)
);
