import React, { useState } from 'react';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { addNewRecipe} from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = (props) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const [recipe, setRecipe] = useState({
        recipe_name: '',
        prep_time: 0,
        cook_time: 0,
        category: '',
        source: '',
        ingredients: [],
        steps: [],
        user_id: userId
    })
    const [ingredient, setIngredient] = useState({
        ingredient_name : '',
        ingredient_unit : '',
        quantity: 0,
        recipe_id: recipe.recipe_id
    })

    const [step, setStep] = useState({
        step_instruction : '',
        step_number : 1,
        recipe_id: recipe.recipe_id
    })

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeStep = (e) => {
        setStep({
            ...step,
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
            .post('/recipes', recipe)
                .then(res=>{
                    props.addNewRecipe(res.data);
                    navigate(`/dashboard`);
                }) 
                .catch(err=>{
                    console.log(err.response.data);
                })   
    
    }

    const ingredientAdder = (e) => {
        e.preventDefault();

        setRecipe({
            ...recipe,
            ingredients : [...recipe.ingredients, ingredient]
        })
        setIngredient({
            ingredient_name : '',
            ingredient_unit : '',
            quantity: 0,
        })
    }

    const stepAdder = (e) => {
        e.preventDefault();

        setRecipe({
            ...recipe,
            steps : [...recipe.steps, step]
        })
        setStep({
            step_instruction : '',
            step_number : step.step_number +1
        })
    }

    return(
        <div>
            <Header/>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <h1 className='title'>Add a Recipe</h1>
                    </div>
                    <div>
                        <div>
                            <label className="label">Recipe Name</label>
                            <input value={recipe.recipe_name} onChange={handleChange} name="recipe_name" type="text" className="input"/>
                        </div>

                        <div>
                            <label className="label">Ingredients</label>
                            {
                                //Showing the current ingredients
                                recipe.ingredients && recipe.ingredients.map(ingredient=>(
                                    <p>{ingredient.quantity} {ingredient.ingredient_unit} of {ingredient.ingredient_name}</p>
                                ))
                            }
                            <input value={ingredient.ingredient_name} onChange={handleChangeIngredient} name="ingredient_name" type="text" placeholder='Ingredient Name' className="input"/>
                            <input value={ingredient.ingredient_unit} onChange={handleChangeIngredient} name="ingredient_unit" type="text" placeholder='Unit of Measurement' className="input"/>
                            <label>Amount</label><input value={ingredient.quantity} onChange={handleChangeIngredient} name="quantity" type="number" placeholder='Amount' className="input"/>
                            <button onClick={ingredientAdder}>Add ingredient</button>
                        </div>

                        <div>
                            <label className="label">Steps</label>
                            {
                                //Showing the current steps
                                recipe.steps && recipe.steps.map(step=>(
                                    <p>{step.step_number}) {step.step_instruction}</p>
                                ))
                            }
                            <input value={step.step_instruction} onChange={handleChangeStep} name="step_instruction" type="text" className="input"/>
                            <button onClick={stepAdder}>Add step</button>
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