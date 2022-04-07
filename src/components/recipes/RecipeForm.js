import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router-dom';
import EditIngredient from './EditIngredient';
import EditStep from './EditStep';
import { makeIngredientsArray, makeIngredientsString, makeStepsArray, makeStepsString } from '../utils/helpers';

const ingredientsList = []
const stepsList = []

const RecipeForm = (props) => {
    const navigate = useNavigate();
    const {recipe_id} = useParams();

    useEffect(()=>{
        axiosWithAuth()
            .get(`/${recipe_id}`)
                .then(res=>{
                    setRecipe({
                        ...recipe,
                        recipe_name: res.data[0].recipe_name,
                        prep_time: res.data[0].prep_time,
                        cook_time: res.data[0].cook_time,
                        category: res.data[0].category,
                        source: res.data[0].source,
                        ingredients: makeIngredientsArray(res.data[0].ingredients),
                        steps: makeStepsArray(res.data[0].steps)
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
        ingredients: [],
        steps: [],
    })

    //==================Ingredients Array Helpers==================
    const addIng = (ingredient) => {
        ingredientsList.push({...ingredient, ing_id: Math.floor(Date.now()/1000)})
        
        setRecipe({
            ...recipe,
            ingredients: ingredientsList
        })
    }

    const editIng = (ingredient, id) => {
        ingredientsList.forEach((ing, i)=>{
            if(ing.ing_id === id){
                ingredientsList[i] = ingredient
            }
        })
        setRecipe({
            ...recipe,
            ingredients: ingredientsList
        })
    }

    const deleteIng = (ingredient) => {
        setRecipe({
            ...recipe,
            ingredients: recipe.ingredients.filter(ing=> ing.ing_id !== ingredient.ing_id)
        })
    }

    //==================Directions/Steps Array Helpers==================
    const addStep = (step) => {
        stepsList.push({...step, step_id: Math.floor(Date.now()/1000)})
        
        setRecipe({
            ...recipe,
            steps: stepsList
        })
    }

    const editStep = (step, id) => {
        stepsList.forEach((stp, i)=>{
            if(stp.step_id === id){
                stepsList[i] = step
            }
        })
        setRecipe({
            ...recipe,
            steps: stepsList
        })
    }

    const deleteStep = (step) => {
        setRecipe({
            ...recipe,
            steps: recipe.steps.filter(stp=> stp.step_id !== step.step_id)
        })
    }
    //===================================================================

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
      
        axiosWithAuth()
            .put(`/${recipe_id}`, {
                ...recipe, 
                ingredients: makeIngredientsString(recipe.ingredients),
                steps: makeStepsString(recipe.steps)
            })
                .then(res=>{
                    navigate(`/dashboard`);
                }) 
                .catch(err=>{
                    console.log(err.response.data);
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

                        <div>
                            <label className="label">Ingredients</label>
                            {
                                recipe.ingredients.length > 0 && 
                                    
                                    recipe.ingredients.map((ingredient, i)=>(
                                        <EditIngredient ingredient={ingredient} edit={true} toggled={true} key={i} editIng={editIng} deleteIng={deleteIng} />
                                    ))
                                    
                                   
                            }
                            <EditIngredient ingredient={{}} edit={false} toggled={false} addIng={addIng} deleteIng={deleteIng} />
                        </div>

                        <div>
                            <label className="label">Steps</label>
                            {
                                recipe.steps.length > 0 && 
                                    
                                    recipe.steps.map((step_name, i)=>(
                                        <EditStep step_name={step_name} edit={true} toggled={true} key={i} editStep={editStep} deleteIng={deleteStep} />
                                    ))
                                    
                                   
                            }
                            <EditStep step_name={{}} edit={false} toggled={false} addStep={addStep} deleteStep={deleteStep} />
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

export default RecipeForm;