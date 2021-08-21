import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alert";
const Alert = ({ alerts, removeAlert }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div
            key={alert.id}
            className={`alert alert-${alert.alertType}`}
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
                borderRadius: "10px",
            }}
        >
            {alert.msg}
            <button
                className="fas fa-window-close"
                style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    width: "2rem",
                    height: "2rem",
                    padding: "0px",
                }}
                onClick={(e) => {
                    removeAlert(alert.id);
                }}
            >
                {/* <i class="fas fa-window-close"></i> */}
            </button>
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
