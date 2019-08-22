import React from "react";
import { connect } from "react-redux";
import { login, getTasks } from "../actions";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    const onChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    const onSubmit = async e => {
      e.preventDefault();
      const { email, password } = this.state;
      await this.props.login({ email, password });
      await this.props.getTasks();
      if (this.props.isAuth) {
        this.props.history.push("/tasks");
      }
    };

    return (
      <div className="auth">
        <h2>Login</h2>
        <form className="auth-group" onSubmit={e => onSubmit(e)}>
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
          <input type="submit" value="Login" />
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
  { login, getTasks }
)(Login);
