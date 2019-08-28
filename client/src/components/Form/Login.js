import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

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
        className={props.meta.touched && props.meta.error ? "auth-error" : null}
        {...props.input}
        type={props.type}
        placeholder={props.placeholder}
      />
      {Error(props.meta)}
    </Fragment>
  );
};

const Login = props => {
  const onSubmit = async formValue => {
    await props.login(formValue);
    props.history.push("/");
  };
  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit(onSubmit)} className="auth-group">
        <Field
          name="email"
          component={Input}
          type="email"
          placeholder="Enter your email"
        />
        <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Enter your password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) {
    errors.email = "You must enter an email";
  }

  if (!password) {
    errors.password = "You must enter a password";
  }

  if (password !== undefined && password.length < 6) {
    errors.password = "Password must have 6 or more characters";
  }
  return errors;
};

const LoginForm = reduxForm({
  form: "login",
  validate
})(Login);

export default connect(
  null,
  { login }
)(LoginForm);
