import axios from 'axios';

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const ADD_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
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

export const addIngredient = (ingredient) => {
    return({type:ADD_INGREDIENT, payload: ingredient})
}

export const setIngredients = (string) => {
    return({type: SET_INGREDIENTS, payload: string});
}

export const addNewRecipe = (newRecipe) => {
    return({type: ADD_RECIPE, payload: newRecipe});
}

export const deleteRecipe = (recipe_id) => {
    return({type: DELETE_RECIPE, payload: recipe_id});
}

// export const editRecipe = (editedRecipe) => {
//     return({type: EDIT_RECIPE, payload: editedRecipe});
// }

export const setError = (newError) => {
    return({type: SET_ERROR, payload: newError});
}