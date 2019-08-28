import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

const Post = ({ _id, title, dateCreated, authorName }) => {
  dateCreated = moment(dateCreated).format("DD/MM/YYYY - h:mm:ss a");
  return (
    <div className="blogshowcase-item">
      <div>
        <h2 className="blogshowcase-item-title">Title - {title}</h2>
        <p className="blogshowcase-item-time">Created At: {dateCreated}</p>
        <p className="blogshowcase-item-author">Author - {authorName}</p>
      </div>
      <div className="blogshowcase-menu">
        <Link to={`/blog/show/${_id}`}>
          <i className="far fa-eye fa-2x"></i>
        </Link>
        <Link to={`/blog/edit/${_id}`}>
          <i className="fas fa-pencil-alt fa-2x"></i>
        </Link>
      </div>
    </div>
  );
};
const BlogShowcase = ({ posts }) => {
  return (
    <div className="blogshowcase">
      <Link to="/blog/add">
        <i className="fas fa-plus-circle fa-2x"></i>
      </Link>
      {posts.map(({ _id, title, dateCreated, authorName }) => (
        <Fragment key={_id}>
          {Post({ _id, title, dateCreated, authorName })}
        </Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(BlogShowcase);
