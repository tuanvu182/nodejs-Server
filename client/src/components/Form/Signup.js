import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

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
        placeholder={props.placeholder}
        type={props.type}
      />
      {Error(props.meta)}
    </Fragment>
  );
};

const Signup = props => {
  const onSubmit = async formValue => {
    props.dispatch(register(formValue));
    props.history.push("/");
  };

  return (
    <div onSubmit={props.handleSubmit(onSubmit)} className="auth">
      <h2>Sign a new User</h2>
      <form className="auth-group">
        <Field
          name="name"
          component={Input}
          placeholder="Enter your username"
          type="text"
        />
        <Field
          name="email"
          component={Input}
          placeholder="Enter your email"
          type="email"
        />
        <Field
          name="password"
          component={Input}
          placeholder="Enter your password"
          type="password"
        />
        <Field
          name="confirmPw"
          component={Input}
          placeholder="Confirm your password"
          type="password"
        />
        <input
          placeholder="Confirm your password"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

const validate = ({ name, email, password, confirmPw }) => {
  const errors = {};
  if (!name) {
    errors.name = "You must enter a username";
  }

  if (name !== undefined && name.length < 6) {
    errors.name = "Username must have 6 or more characters";
  }

  if (!email) {
    errors.email = "You must enter an email";
  }

  if (!password) {
    errors.password = "You must enter a password";
  }

  if (password !== undefined && password.length < 6) {
    errors.password = "Password must have 6 or more characters";
  }

  if (password !== confirmPw) {
    errors.confirmPw = "Password is not match";
  }
  return errors;
};

const SignupForm = reduxForm({
  form: "createUser",
  validate
})(Signup);

const mapStateToProps = state => ({
  auth: state.auth.auth
});

export default connect(
  mapStateToProps,
  { register }
)(SignupForm);
