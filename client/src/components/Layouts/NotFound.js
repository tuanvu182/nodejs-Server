import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <h2>404 Page not found</h2>
      <Link className="backBtn" to="/">
        Go back to main page
      </Link>
    </div>
  );
};

export default NotFound;
