import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return alerts !== null && alerts.length > 0
    ? alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <p>{alert.msg}</p>
        </div>
      ))
    : null;
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
