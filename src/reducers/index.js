import { FETCH_START, FETCH_FAIL, FETCH_SUCCESS, ADD_RECIPE, SET_ERROR, DELETE_RECIPE, EDIT_RECIPE, ADD_INGREDIENT, SET_INGREDIENTS} from '../actions';

export const initialState = {
    recipes: [],
    ingredients: [],
    loading: false,
    errorMessage: ''
}

const outJoiner = '*0uT7o1n3r*'
const inJoiner = '-1n8J0i2e4-'

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
        case ADD_INGREDIENT:
            
            return {
                ...state,
                ingredients:  
                    state.ingredients.map(ing=> {
                        if(ing.ing_id === action.payload.ing_id){
                            return action.payload
                        }
                        return ing
                    })
            };
        case SET_INGREDIENTS:
            let ingArr = []
            const outerArray = action.payload.split(outJoiner)
            outerArray.forEach(ingStr => {
                let inner = ingStr.split(inJoiner)
                let ingObj = {
                    quantity: Number(inner[0]),
                    ingredient_unit : inner[1],
                    ingredient_name: inner[2],
                    ing_id : Math.floor(Date.now()/100000)
                }
                ingArr.push(ingObj)
            })
            return {
                ...state,
                ingredients: ingArr
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
