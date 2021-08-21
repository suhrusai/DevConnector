import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
export const Profile = ({
    getProfileById,
    auth,
    profile: { profile, loading },
    match,
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);
    console.log("match.params.id: ", match.params.id);
    return <Fragment></Fragment>;
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

const mapDispatchToProps = {
    getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
