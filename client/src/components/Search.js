import React from "react";
import { connect } from "react-redux";
import { hideSearch, addTask } from "../actions";

class Search extends React.Component {
  state = {
    title: ""
  };

  onChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { title } = this.state;
    await this.props.addTask(title);
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            type="text"
            placeholder="Enter your task"
            value={this.state.title}
            name="title"
            minLength="5"
            onChange={e => this.onChange(e)}
            required
          />
        </form>
        <button onClick={this.props.hideSearch} className="search-cancel">
          <i className="far fa-times-circle fa-3x" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchShow: state.searchShow
});

export default connect(
  mapStateToProps,
  { hideSearch, addTask }
)(Search);
