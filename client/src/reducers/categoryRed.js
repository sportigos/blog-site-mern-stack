//  Begin Date: 2020/05/24  Sun
import { 
    SET_CATEGORIES, 
    ADD_SUB_CATEGORIES,
    REMOVE_SUB_CATEGORIES, 
    SET_CATEGORY_INFO } from "../actions/types";

const initialState = {
    categories:     [],
    categoryInfo:   {}
};

export default function(state = initialState, action){
    switch(action.type) {
        case SET_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };
        case ADD_SUB_CATEGORIES: 
            var parentIndex,
                data = action.payload,
                categories = state.categories;
            for(let i=0; i<categories.length; i++) {
                if(categories[i]._id === data._id) {
                    parentIndex = i;
                }
            }
            var afterCategories = categories.splice(parentIndex+1);
            categories.push(...data.subCategories, ...afterCategories);
            return {
                ...state
            }
        case REMOVE_SUB_CATEGORIES:
            var _id = action.payload
            var originCategories = state.categories;
            var subCategories = originCategories.filter(catg => {
                let isExist = catg.ancestors.find(anc => anc === _id);
                if(isExist)
                    return true;
                else 
                    return false;
            });

            for(let i=0; i<subCategories.length; i++) {
                for(let j=0; j<originCategories.length; j++) {
                    if(subCategories[i] === originCategories[j]) {
                        originCategories.splice(j, 1);
                    }
                }
            }
            return {
                ...state
            }
        case SET_CATEGORY_INFO: 
            return {
                ...state,
                categoryInfo: action.payload
            }
        default: return state;
    }
}