import { FETCH_START, FETCH_FAIL, FETCH_SUCCESS, ADD_RECIPE, SET_ERROR} from './../actions';

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
            const newRecipe = {
                name: action.payload.name,
                position: action.payload.position,
                description: action.payload.description
            }
            return {
                ...state,
                recipes: [...state.recipes, newRecipe]
            };
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
