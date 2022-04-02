import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { addNewRecipe} from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router-dom';

const AddRecipeForm = (props) => {
    const navigate = useNavigate();
    const {recipe_id} = useParams();

    useEffect(()=>{
        axiosWithAuth()
            .get(`/${recipe_id}`)
                .then(res=>{
                    console.log('==================useEffect GET on Edit Page =======================',res);
                    setRecipe({
                        ...recipe,
                        recipe_name: res.data[0].recipe_name
                    })
                }) 
                .catch(err=>{
                    console.log(err.response.data);
                })   
    }, []);
    
    const [recipe, setRecipe] = useState({
        recipe_id: recipe_id,
        recipe_name: '',
        prep_time: '',
        cook_time: '',
        category: '',
        source: '',
        ingredients: '',
        steps: ''
    })

    const [ingredient, setIngredient] = useState({
        ingredient_name : '',
        ingredient_unit : '',
        quantity: 0,
        recipe_id: recipe_id
    })


    const [fullRecipe, setFullRecipe] = useState({
        recipe: recipe,
        ingredients: [],
    })

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeIngredient = (e) => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axiosWithAuth()
            .put(`/${recipe_id}`, recipe)
                .then(res=>{
                    console.log('==================Submit PUT on Edit Page =======================',res);
                    navigate(`/dashboard`);
                }) 
                .catch(err=>{
                    console.log(err.response.data);
                })   
    }

    //This will need to change to a helper to map and join
    const ingredientAdder = (e) => {
        e.preventDefault();

        setFullRecipe({
            ...fullRecipe,
            ingredients : [...fullRecipe.ingredients, ingredient]
        })
        
        setIngredient({
            ingredient_name : '',
            ingredient_unit : '',
            quantity: 0,
        })
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <h1 className='title'>{recipe.recipe_name}</h1>
                    </div>
                    <div>
                        <div>
                            <label className="label">Recipe Name</label>
                            <input value={recipe.recipe_name} onChange={handleChange} name="recipe_name" type="text" className="input"/>
                        </div>

                        <div>
                            <label className="label">Category</label>
                            <input value={recipe.category} onChange={handleChange} name="category" type="text" className="input"/>
                        </div>

                        <div>
                            <label className="label">Source</label>
                            <input value={recipe.source} onChange={handleChange} name="source" type="text" className="input"/>
                        </div>

                        <div>
                            <div>Prep Time</div>
                            <input value={recipe.prep_time} onChange={handleChange} name="prep_time" type="text" placeholder='How long' />
                            
                            <div>Cook Time</div>
                            <input value={recipe.cook_time} onChange={handleChange} name="cook_time" type="text" placeholder='How long' />
                        </div>

                        {/* <div>
                            <label className="label">Ingredients</label>
                            {
                                //Showing the current ingredients
                                fullRecipe.ingredients && fullRecipe.ingredients.map((ingredient, i)=>(
                                    <p key={i}>{ingredient.quantity} {ingredient.ingredient_unit} of {ingredient.ingredient_name}</p>
                                ))
                            }
                            <input value={ingredient.ingredient_name} onChange={handleChangeIngredient} name="ingredient_name" type="text" placeholder='Ingredient Name' className="input"/>
                            <input value={ingredient.ingredient_unit} onChange={handleChangeIngredient} name="ingredient_unit" type="text" placeholder='Unit of Measurement' className="input"/>
                            <label>Amount</label><input value={ingredient.quantity} onChange={handleChangeIngredient} name="quantity" type="number" placeholder='Amount' className="input"/>
                            <button onClick={ingredientAdder}>Add ingredient</button>
                        </div> */}

                        <div>
                            <label className="label">Steps</label>
                            <textarea value={recipe.steps} onChange={handleChange} name="steps" />
                        </div>
                        
                    </div>
                    <div>
                        <button className='button center primary max'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, {addNewRecipe})(AddRecipeForm);