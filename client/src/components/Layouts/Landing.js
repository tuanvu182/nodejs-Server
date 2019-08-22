import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuth, userEmail }) => {
  return (
    <div className="landing">
      <h2>Welcome to TaskApp</h2>
      {!isAuth || userEmail === null ? (
        <p>
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup</Link> to use
        </p>
      ) : (
        <p>You have logged in as {userEmail}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  userEmail: state.auth.user
});

export default connect(mapStateToProps)(Landing);
