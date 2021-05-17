//  Begin Date: 2020/05/21  Thu
import { combineReducers } from "redux";

import authRed      from "./authRed";
import errorRed     from "./errorRed";
import categoryRed  from "./categoryRed";
import postRed      from "./postRed";
import commentRed   from "./commentRed";

export default combineReducers({
    auth:       authRed,
    category:   categoryRed, 
    post:       postRed,
    comment:    commentRed,
    errors:     errorRed
});