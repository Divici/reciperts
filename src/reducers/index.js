import { FETCH_START, FETCH_FAIL, FETCH_SUCCESS, ADD_RECIPE, SET_ERROR, DELETE_RECIPE, EDIT_RECIPE} from '../actions';

export const initialState = {
    recipes: [],
    loading: false,
    errorMessage: ''
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_START:
            return {
                ...state,
                recipes: [],
                loading: true,
                errorMessage: ''
            };
        case FETCH_FAIL:
            return {
                ...state,
                recipes: [],
                loading: false,
                errorMessage: action.payload
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                loading: false,
                errorMessage: ''
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(item=>(action.payload !== item.recipe_id))
            };
        // case EDIT_RECIPE:
        //     return {
        //         ...state,
        //         recipes: state.recipes.filter(item=>{
        //             if(action.payload.recipe_id === item.recipe_id)
        //             return action.payload !== item.recipe_id
        //         })
        //     };
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return(state);
    }
}

export default reducer;
