import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postDelete } from "../../actions/post";

const Blog = props => {
  const id = props.match.params.id;
  const onClick = async () => {
    props.history.push("/blog");
    await props.postDelete(id);
  };
  return (
    <div className="blogshowcase">
      <div className="blogshowcase-nav">
        <Link to="/blog">
          <i className="fas fa-arrow-circle-left fa-2x"></i>
        </Link>
        <div className="blogshowcase-menu">
          <a onClick={onClick} href="#!">
            <i className="far fa-times-circle fa-2x"></i>
          </a>
          <Link to={`/blog/edit/${id}`}>
            <i className="fas fa-pencil-alt fa-2x"></i>
          </Link>
        </div>
      </div>
      <div className="blogshowcase-item">
        <h2>{props.post.title}</h2>
      </div>
      <div className="blogshowcase-item">
        <p className="blogshowcase-text">{props.post.content}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.find(post => post._id === ownProps.match.params.id);
  return { post };
};

export default connect(
  mapStateToProps,
  { postDelete }
)(Blog);
