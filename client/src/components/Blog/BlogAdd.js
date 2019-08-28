import React from "react";
import { connect } from "react-redux";
import { postCreate } from "../../actions/post";
import BlogForm from "./BlogForm";

const BlogAdd = props => {
  const onSubmit = async formValue => {
    await props.postCreate(formValue);
    props.history.push("/blog");
  };
  return (
    <div>
      <h2 className="blog-title">Post Create</h2>
      <div className="blog-nav"></div>
      <BlogForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(
  null,
  { postCreate }
)(BlogAdd);
