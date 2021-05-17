//  Begin Date:     2020/05/25  Mon
import axios from 'axios';
import {
    SET_POSTS,
    SET_POST,
    SET_PAGE_COUNT,
    GET_ERRORS,
    SET_PAGE_SIZE,
    SET_CURRENT_PAGE,
    SET_COMMENTS,
    SET_POPULAR_POSTS,
    SET_POSTS_TITLE,
    SET_CATEGORY_ID_OF_POSTS,
    SET_POST_SEARCH_FLAG,
    SET_POST_SEARCH_KEY
} from "./types";
import toTreeData from "../utils/toTreeData";

//  post blog    
export const createPostAct = (data, history) => async dispatch => {
    await axios.post("/api/post/createPost", data)
        .then(res => {
            console.log(res.data);
            dispatch({
                type:       SET_POSTS,
                payload:    res.data
            });
            history.push("/");
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

// fetch blogs
export const getPostsAct = (data) => async dispatch => {
    await dispatch({
        type:       SET_PAGE_SIZE,
        payload:    data.pageSize
    });
    await dispatch({
        type:       SET_CURRENT_PAGE,
        payload:    data.currentPage
    });
    await axios.post("/api/post/getPosts", data)
        .then(async res => {
            await dispatch({
                type:       SET_POSTS_TITLE,
                payload:    data.postsTitle
            });
            await dispatch({
                type:       SET_PAGE_COUNT,
                payload:    res.data.dataQuant 
            });
            await dispatch({
                type:       SET_POSTS,
                payload:    res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

//  fetch data about each blogs
export const getPostAct = (_id) => async dispatch => {
    await axios.get(`/api/post/getPost/${_id}`)
        .then(async res => {
            await dispatch({
                type:       SET_POST,
                payload:    res.data.post
            });
            var treeData = await toTreeData(res.data.comments);
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

//  get favourite blogs
export const getPopularPostsAct = () => async dispatch => {
    await axios.get("/api/post/getPopularPosts")
        .then(res => {
            dispatch({
                type:       SET_POPULAR_POSTS,
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

// get blogs for list
export const getPostsOfCategoryAct = (data) => async dispatch => {
    var reqData = {
        categoryId: data.categoryId,
        pageSize:   data.pageSize,
        currentPage:data.currentPage
    }
    await dispatch({
        type:       SET_CURRENT_PAGE,
        payload:    data.currentPage
    });
    await dispatch({
        type:       SET_PAGE_SIZE,
        payload:    data.pageSize
    });
    await dispatch({
        type:       SET_POSTS_TITLE,
        payload:    data.categoryName
    });
    await axios.post("/api/post/getPostsOfCategory", reqData)
        .then(async res => {
            await dispatch({
                type:       SET_PAGE_COUNT,
                payload:    res.data.dataQuant
            });
            await dispatch({
                type:       SET_POSTS,
                payload:    res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

export const setCategoryIdOfPostsAct = (_id) => async dispatch => {
    await dispatch({
        type:   SET_CATEGORY_ID_OF_POSTS,
        payload:_id
    })
}

export const setPostSearchFlagAct = (flag) => async dispatch => {
    await dispatch({
        type:       SET_POST_SEARCH_FLAG,
        payload:    flag
    });
}

export const setPostSearchKeyAct = (key) => async dispatch => {
    await dispatch({
        type:       SET_POST_SEARCH_KEY,
        payload:    key
    });
}

export const searchPostsAct = (data) => async dispatch => {
    
    await dispatch({
        type:       SET_POSTS_TITLE,
        payload:    data.postsTitle
    });
    await dispatch({
        type:       SET_CURRENT_PAGE,
        payload:    data.currentPage
    });
    await dispatch({
        type:       SET_PAGE_SIZE,
        payload:    data.pageSize
    });
    var reqData = {
        key:            data.searchKey,
        pageSize:       data.pageSize,
        currentPage:    data.currentPage
    }
    await axios.post("/api/post/searchPosts", reqData)
        .then(async res => {
            await dispatch({
                type:       SET_PAGE_COUNT,
                payload:    res.data.dataQuant
            });
            await dispatch({
                type:       SET_POSTS,
                payload:    res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

export const setPostLikerAct = (data) => async dispatch => {
    await axios.post("/api/post/setPostLiker", data)
        .then(async res => {
            console.log(res.data);
            await dispatch({
                type:       SET_POST,
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

export const setPostDislikerAct = (data) => async dispatch => {
    await axios.post("/api/post/setPostDisliker", data)
        .then(async res => {
            await dispatch({
                type:       SET_POST,
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