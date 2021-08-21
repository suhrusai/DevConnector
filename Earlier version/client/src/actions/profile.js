import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import api from "../utils/api";
//Get Current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get("http://localhost:5000/profile/me");
        console.log("ACTION PROFILE.JS");
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
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
