import axios from "axios";
import { setAlert } from "./alert";
import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS,
} from "./types";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
//Get Current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get("api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get("api/profile");

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
    try {
        console.log("GetProfile by id: Id recived is :   = ", userId);
        const res = await axios.get(
            "api/profile/user/" + userId
        );
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get github repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get(
            `api/github/${githubUsername}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or update profile
export const createProfile =
    (formData, history, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log("CreateProfile action/profile.js");
            console.log(formData);
            const res = await axios.post(
                " http://localhost:5000/api/profile",
                formData,
                config
            );
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });

            dispatch(
                setAlert(
                    edit ? "Profile Updated" : "Profile Created",
                    "success"
                )
            );
            if (!edit) {
                history.push("/dashboard");
            }
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.msg, "danger"))
                );
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log("Add Expeirence  action/profile.js");
        console.log(formData);
        const res = await axios.put(
            "api/profile/experience",
            formData,
            config
        );
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Experience Added", "success"));
        history.push("/dashboard");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log("Add Expeirence  action/profile.js");
        console.log(formData);
        const res = await axios.put(
            "api/profile/education",
            formData,
            config
        );
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert("Education Added", "success"));
        history.push("/dashboard");
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Delete experiecne
export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `api/profile/experience/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert("Experience  Removed", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `api/profile/education/${id}`
        );

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert("Education Removed", "success"));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm("Are you Sure? This Cannnot be undone!")) {
        try {
            const res = await axios.delete(`api/profile`);

            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert("Account has been permanently deleted"));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
