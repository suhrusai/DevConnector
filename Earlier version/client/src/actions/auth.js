import api from "../utils/api";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        const res = await api.get("http://localhost:5000/api/auth");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = (formData) => async (dispatch) => {
    try {
        const res = await api.post("http://localhost:5000/api/users", formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    const body = { email, password };

    try {
        console.log("LOGIN USER METHOD API POST: body{ ", body, " }");
        const res = await api.post("http://localhost:5000/api/auth", body);
        console.log("LOGIN USER METHOD API POST: res{ ", res, " }");
        // dispatch({
        //     type: LOGIN_SUCCESS,
        //     payload: res.data,
        // });

        dispatch(loadUser());
    } catch (err) {
        console.log("LOGIN USER METHOD ERR: err{ ", err, " }");
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout
export const logout = () => ({ type: LOGOUT });
