import React from "react";
import { connect } from "react-redux";
import { setAlert, register, getTasks } from "../actions/index";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  render() {
    const onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    const onSubmit = async e => {
      e.preventDefault();
      if (this.state.password !== this.state.confirmPassword) {
        this.props.setAlert("Password do not match", "danger");
      } else {
        const { email, password } = this.state;
        await this.props.register({ email, password });
        await this.props.getTasks();
        if (this.props.isAuth) {
          this.props.history.push("/tasks");
        }
      }
    };

    return (
      <div className="auth">
        <h2>Sign a new User</h2>
        <form
          onSubmit={e => {
            onSubmit(e);
          }}
          className="auth-group"
        >
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={this.state.email}
            onChange={e => onChange(e)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={this.state.password}
            onChange={e => onChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={e => onChange(e)}
          />
          <input type="submit" value="Confirm" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register, getTasks }
)(Signup);
