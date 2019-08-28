import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";

const Error = ({ error, touched }) => {
  if (error && touched) {
    return (
      <div className="auth-showErrors">
        <span>{error}</span>
      </div>
    );
  }
};

const Input = props => {
  return (
    <Fragment>
      <input
        className={props.meta.error && props.meta.touched ? "auth-error" : null}
        {...props.input}
        placeholder={props.placeholder}
      />
      {Error(props.meta)}
    </Fragment>
  );
};

const Textarea = props => {
  return (
    <Fragment>
      <textarea
        {...props.input}
        className={props.meta.error && props.meta.touched ? "auth-error" : null}
        placeholder={props.placeholder}
      />
      {Error(props.meta)}
    </Fragment>
  );
};

const BlogForm = props => {
  const onSubmit = async formValue => {
    props.onSubmit(formValue);
  };
  return (
    <div className="blog">
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <Field name="title" component={Input} placeholder="Title..." />
        <Field name="content" component={Textarea} placeholder="Content..." />
        <input className="blogAdd-btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

const validate = ({ title, content }) => {
  const errors = [];
  if (!title) {
    errors.title = "Title is required";
  }
  if (!content) {
    errors.content = "Content is required";
  }
  return errors;
};

export default reduxForm({
  form: "blogForm",
  validate
})(BlogForm);
