//  Begin Date: 2020/05/25  Mon
import { 
    SET_POSTS,
    SET_POST,
    SET_PAGE_SIZE,
    SET_CURRENT_PAGE,
    SET_PAGE_COUNT,
    SET_POSTS_TITLE,
    SET_CATEGORY_ID_OF_POSTS,
    SET_POST_SEARCH_FLAG,
    SET_POST_SEARCH_KEY
} from "../actions/types";

const initialState = {
    posts:              [],
    post:               {},
    pageSize:           4,
    currentPage:        1,
    pageCount:          1,
    postsTitle:         "All blogs",
    categoryIdOfPosts:  "",
    postSearchFlag:     0,
    postSearchKey:      ""
};

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_PAGE_SIZE: 
            return {
                ...state,
                pageSize:   action.payload
            }
        case SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_PAGE_COUNT: 
            return {
                ...state,
                pageCount: Math.ceil(action.payload / state.pageSize)
            }
        case SET_POST: 
            return {
                ...state,
                post: action.payload
            }
        case SET_POSTS_TITLE: 
            return {
                ...state,
                postsTitle: action.payload
            }
        case SET_CATEGORY_ID_OF_POSTS: 
            return {
                ...state, 
                categoryIdOfPosts: action.payload
            }
        case SET_POST_SEARCH_FLAG: 
            return {
                ...state,
                postSearchFlag: action.payload
            }
        case SET_POST_SEARCH_KEY:
            return {
                ...state,
                postSearchKey: action.payload
            }
        default:    return state;
    }
}