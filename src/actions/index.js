export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const SET_ERROR = "SET_ERROR";

export const fetchStart = () => {
    return({type:FETCH_START});
}

export const fetchSuccess = (recipes) => {
    return({type:FETCH_SUCCESS, payload: recipes})
}

export const fetchFail = (errorMessage) => {
    return({type:FETCH_FAIL, payload: errorMessage});
}

export const deleteRecipe = (recipe_id) => {
    return({type: DELETE_RECIPE, payload: recipe_id});
}

export const setError = (newError) => {
    return({type: SET_ERROR, payload: newError});
}