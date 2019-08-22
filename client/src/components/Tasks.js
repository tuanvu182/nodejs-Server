import React from "react";
import { connect } from "react-redux";
import { showSearch, deleteTask } from "../actions";
import Search from "./Search";
import moment from "moment";

const Tasks = ({ searchShow, showSearch, tasks, deleteTask }) => {
  const addBtn = () => {
    return (
      <div className="addBtn">
        <button onClick={showSearch}>
          <i className="fas fa-plus-circle fa-3x" />
        </button>
      </div>
    );
  };

  const Task = (key, task, date) => {
    const onClick = () => {
      deleteTask(key);
    };
    const timeFromNow = moment(date).fromNow();
    const formatDate = moment(date).format("Do MMM YYYY");
    const currentTime = moment(Date.now()).diff(moment(date));
    const deadline = 7 * 24 * 60 * 60 * 1000;
    const process = Math.floor((currentTime / deadline) * 100);
    return (
      <div key={key} className="task">
        <div>
          <p className="task-detail">Task Details - {task}</p>
          <p className="task-date">
            Dated Created - {formatDate} ({timeFromNow})
          </p>
          <p className="task-progress">
            Progressing Bar
            <progress max="100" value={process > 100 ? "100" : process} />
            <span>
              ({process > 100 ? "Dealine was reached" : process + "%"})
            </span>
          </p>
        </div>
        <div className="task-menu">
          <button onClick={onClick}>
            <i className="far fa-times-circle fa-2x" />
          </button>
          <button>
            <i className="far fa-eye fa-2x" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      {searchShow ? <Search /> : addBtn()}
      {tasks.length === 0 ? (
        <h4>You do not have any task</h4>
      ) : (
        tasks.map(task => {
          return Task(task._id, task.title, task.date);
        })
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  searchShow: state.searchShow,
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { showSearch, deleteTask }
)(Tasks);
