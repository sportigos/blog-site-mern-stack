//  Begin Date: 2020/05/23  Sat
import axios from 'axios';
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const signUpAct = (data, history) => async dispatch => {
    await axios.post("/api/user/signUp", data)
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            });
            history.push("/signIn");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const signInAct = (data, history) => async dispatch => {
    await axios.post("/api/user/signIn", data)
        .then(res => {
            var { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            var decoded = jwt_decode(token);
            dispatch(setCurrentUserAct(decoded));
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const signOutAct = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUserAct({}));
};

export const setCurrentUserAct = decoded => {
    return {
        type:       SET_CURRENT_USER,
        payload:    decoded
    };
};