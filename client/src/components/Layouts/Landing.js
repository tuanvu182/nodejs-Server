import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <h2>Welcome to My Blog</h2>
      <p>
        Please<Link to="/login"> login </Link>or
        <Link to="/signup"> signup </Link>to use
      </p>
    </div>
  );
};

export default Landing;
