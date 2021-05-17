//  Begin Date: 2020/05/28  
import {
    SET_ALL_TAGS,
    SET_TAGS_OF_POST,
    SET_TAG_PAGE_SIZE,
    SET_TAG_CURRENT_PAGE,
    SET_TAG_PAGE_COUNT
} from "../actions/types";

const initialState = {
    allTags:        [],
    tagsOfPost:     [],
    pageSize:       4,
    currentPage:    1,
    pageCount:      1,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_ALL_TAGS: 
            return {
                ...state,
                allTags: action.payload
            }
        case SET_TAGS_OF_POST: 
            return {
                ...state,
                tagsOfPost: action.payload
            }
        case SET_TAG_PAGE_SIZE: 
            return {
                ...state,
                pageSize: action.payload
            }
        case SET_TAG_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_TAG_PAGE_COUNT: 
            return {
                ...state,
                pageCount: Math.ceil(action.payload/state.pageSize)
            }
        default:    return state;
    }
} 