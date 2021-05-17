//  Begin Date:     2020/05/26  Tue
import {
    SET_COMMENTS, 
    SET_COMMENT_SEARCH_FLAG,
    SET_COMMENTS_QUANT
} from "../actions/types";

const initialState = {
    comments:           [],
    commentSearchFlag:  0,
    commentsQuant:      0
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_COMMENTS: 
            return {
                ...state,
                comments: action.payload
            }
        case SET_COMMENT_SEARCH_FLAG: 
            return {
                ...state,
                commentSearchFlag: action.payload
            }
        case SET_COMMENTS_QUANT:
            return {
                ...state,
                commentsQuant: action.payload
            }
        default: return state;
    }
}