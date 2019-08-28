import React from "react";
import { connect } from "react-redux";
import {} from "../../actions/post";
import BlogForm from "./BlogForm";
import { postEdit, postDelete } from "../../actions/post";
import { Link } from "react-router-dom";

const BlogEdit = props => {
  const onSubmit = async formValue => {
    formValue.id = props.match.params.id;
    await props.postEdit(formValue);
    props.history.push("/blog");
  };

  const onClick = async () => {
    props.history.push("/blog");
    await props.postDelete(props.match.params.id);
  };

  return (
    <div>
      <h2 className="blog-title">Post Edit</h2>
      <div className="blog-menu">
        <Link to="/blog">
          <i className="fas fa-arrow-circle-left fa-2x"></i>
        </Link>
        <a onClick={onClick} href="#!">
          <i className="fas fa-times fa-2x"></i>
        </a>
      </div>
      <BlogForm
        initialValues={{ title: props.post.title, content: props.post.content }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.find(post => post._id === ownProps.match.params.id);
  return { post };
};

export default connect(
  mapStateToProps,
  { postEdit, postDelete }
)(BlogEdit);
