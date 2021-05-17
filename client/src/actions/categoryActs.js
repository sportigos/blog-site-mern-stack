//  Begin Date:     2020/05/24  Sun
import axios from 'axios';
import { 
    SET_CATEGORIES, 
    ADD_SUB_CATEGORIES,
    REMOVE_SUB_CATEGORIES,
    SET_CATEGORY_INFO,
    GET_ERRORS 
} from "./types";

export const getRootCategoriesAct = () => async dispatch => {
    await axios.get("/api/category/getRootCategories")
        .then(res => {
            dispatch({
                type:       SET_CATEGORIES,
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

export const getSubCategoriesAct = (_id) => async dispatch => {
    await axios.get(`/api/category/getSubCategories/${_id}`)
        .then(res => {
            var data = {
                _id:            _id,
                subCategories:  res.data
            }
            dispatch({
                type:       ADD_SUB_CATEGORIES,
                payload:    data
            })
        })
        .catch(err => {
            dispatch({
                type:       GET_ERRORS,
                payload:    err.response.data
            })
        });
}

export const removeSubCategoriesAct = (_id) => dispatch => {
    dispatch({
        type:       REMOVE_SUB_CATEGORIES,
        payload:    _id
    })
}

// Get info about necessary list for blog
export const setCategoryInfoAct = (data) => dispatch => {
    dispatch({
        type:       SET_CATEGORY_INFO,
        payload:    data
    })
}