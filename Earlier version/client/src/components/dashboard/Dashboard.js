import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getCurrentProfile } from "../../actions/profile";
const Dashboard = ({ getCurrentProfile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return <div></div>;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
