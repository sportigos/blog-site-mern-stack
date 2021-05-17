//  Begin Date: 2020/05/26  Tue
import axios from 'axios';
import {
    SET_COMMENTS,
    GET_ERRORS,
    SET_COMMENT_SEARCH_FLAG,
    SET_COMMENTS_QUANT
} from "./types";
import toTreeData from "../utils/toTreeData";

//  send answer
export const sendCommentAct = (data) => async dispatch => {
    await axios.post("/api/comment/saveComment", data)
        .then(async res => {
            var treeData = await toTreeData(res.data);
            dispatch({
                type:       SET_COMMENTS,
                payload:    treeData
            })
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

//  search answer
export const searchCommentsAct = (data) => async dispatch => {
    await axios.post("/api/comment/searchComments", data)
        .then(async res => {
            if(data.key !== "") {
                await dispatch({
                    type:       SET_COMMENT_SEARCH_FLAG,
                    payload:    1
                });
                await dispatch({
                    type:       SET_COMMENTS,
                    payload:    res.data
                });
            } else {
                var treeData = await toTreeData(res.data);
                await dispatch({
                    type:       SET_COMMENT_SEARCH_FLAG,
                    payload:    0
                });
                await dispatch({
                    type:       SET_COMMENTS,
                    payload:    treeData
                });
            }
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

// get count of answers for one article
export const getCommentsQuantAct = (post) => async dispatch => {
    await axios.get(`/api/comment/getCommentsQuant/${post}`)
        .then(async res => {
            await dispatch({
                type:       SET_COMMENTS_QUANT,
                payload:    res.data
            })
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

//  Like answer
export const setCommentLikerAct = (data) => async dispatch => {
    await axios.post("/api/comment/setCommentLiker", data)
        .then(async res => {
            var treeData = await toTreeData(res.data);
            await dispatch({
                type:       SET_COMMENTS,
                payload:    treeData
            });
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

//  Dislike answer
export const setCommentDislikerAct = (data) => async dispatch => {
    await axios.post("/api/comment/setCommentDisliker", data)
        .then(async res => {
            var treeData = await toTreeData(res.data);
            await dispatch({
                type:       SET_COMMENTS,
                payload:    treeData
            });
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}
