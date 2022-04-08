import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { v4 as uuid } from 'uuid';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router-dom';
import EditIngredient from './EditIngredient';
import EditStep from './EditStep';
import { makeIngredientsArray, makeIngredientsString, makeStepsArray, makeStepsString } from '../utils/helpers';

let ingredientsList = []
let stepsList = []

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
                    ingredientsList= makeIngredientsArray(res.data[0].ingredients).map(item=>item)
                    stepsList= makeStepsArray(res.data[0].steps).map(item=>item)
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
        
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, {...ingredient, ing_id: uuid().slice(0,8)}]
        })
    }

    const editIng = (ingredient) => {
        const newIng = recipe.ingredients.filter(ing=> ing.ing_id !== ingredient.ing_id)

        newIng.push(ingredient)
        setRecipe({
            ...recipe,
            ingredients: newIng
        })
        
    }

    const deleteIng = (ingredient) => {
        const newIng = recipe.ingredients.filter(ing=> ing.ing_id !== ingredient.ing_id)

        setRecipe({
            ...recipe,
            ingredients: newIng
        })
    }
    
    //==================Directions/Steps Array Helpers==================
    const addStep = (step) => {
        
        setRecipe({
            ...recipe,
            steps: [...recipe.steps, {...step, step_id: uuid().slice(0,8)}]
        })
    }

    const editStep = (step) => {
        let index = 0

        const copyStepArr = recipe.steps.map((stp, i)=>{
            if(stp.step_id === step.step_id){
                index = i
            }
            return stp
        })
        copyStepArr[index] = step
        setRecipe({
            ...recipe,
            steps: copyStepArr
        })
    }

    const deleteStep = (step) => {
        const newStep = recipe.steps.filter(stp=> stp.step_id !== step.step_id)

        setRecipe({
            ...recipe,
            steps: newStep
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
console.log('steps: ',recipe.steps);
    return(
        <div>
            <Header/>
            <div className="">
                <div className='shadow-xl pb-4 mb-8 bg-white'>
                    <h1 className='text-4xl md:text-6xl text-center font-normal font-serif tracking-normal'>{recipe.recipe_name}</h1>
                </div>
                <form className="w-10/12 mx-auto" onSubmit={handleSubmit}>
                    
                    <div>
                        <div className='flex items-center mb-4'>
                            <label className="w-32 font-semibold text-base">Recipe Name:</label>
                            <input 
                                value={recipe.recipe_name} 
                                onChange={handleChange} 
                                name="recipe_name" type="text" 
                                className="w-full px-4 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100"
                            />
                        </div>

                        <div className='flex items-center mb-4'>
                            <label className="w-32 font-semibold text-base">Category:</label>
                            
                            <select value={recipe.category} 
                                onChange={handleChange} 
                                name="category"
                                className="w-full px-4 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100">
                                <option value='All'>All</option>
                                <option value='Breakfast'>Breakfast</option>
                                <option value='Lunch'>Lunch</option>
                                <option value='Dinner'>Dinner</option>
                                <option value='Snack'>Snack</option>
                                <option value='Dessert'>Dessert</option>
                                <option value='Appetizer'>Appetizer</option>
                                <option value='Vegetarian'>Vegetarian</option>
                                <option value='Vegan'>Vegan</option>
                                <option value='Soup'>Soup</option>
                                <option value='Salad'>Salad</option>
                            </select>
                        </div>

                        <div className='flex items-center mb-4'>
                            <label className="w-32 font-semibold text-base">Source:</label>
                            <input value={recipe.source} 
                            onChange={handleChange} 
                            name="source" type="text" 
                            className="w-full px-4 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100"/>
                        </div>

                        <div className='flex justify-around items-center text-center mb-8'>
                            <div className='mx-auto w-52 md:w-1/3 font-semibold text-base'>Prep Time: 
                                <input value={recipe.prep_time} onChange={handleChange} name="prep_time" type="text" placeholder='How long' 
                                className='w-full px-4 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100'/>
                            </div>
                            <div className='mx-auto w-52 md:w-1/3 font-semibold text-base'>Cook Time: 
                                <input value={recipe.cook_time} onChange={handleChange} name="cook_time" type="text" placeholder='How long' 
                                className='w-full px-4 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100'/>
                            </div>
                        </div>

                        <div className=''>
                            <p className="mb-2 font-semibold text-base text-center">Ingredients</p>
                            <div className='px-1 pb-2 bg-slate-200'>
                                {
                                    recipe.ingredients.length > 0 && 
                                        
                                        recipe.ingredients.map((ingredient, i)=>(
                                            <EditIngredient ingredient={ingredient} edit={true} toggled={true} key={i} editIng={editIng} deleteIng={deleteIng} />
                                        ))
                                        
                                    
                                }
                            </div>
                            <div className='mt-8 pt-1 pb-4'>
                                <EditIngredient ingredient={{
                                    quantity: 0,
                                    ingredient_unit : '',
                                    ingredient_name : '',
                                    ing_id: uuid().slice(0,8)
                                }} edit={false} toggled={false} addIng={addIng} deleteIng={deleteIng} />
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 font-semibold text-base text-center">Directions</p>
                            <div className='px-1 py-2 bg-slate-200'>
                                {
                                    recipe.steps.length > 0 && 
                                        
                                        recipe.steps.map((step_name, i)=>(
                                            <EditStep step_name={step_name} edit={true} toggled={true} key={i} editStep={editStep} deleteStep={deleteStep} />
                                        ))
                                        
                                    
                                }
                            </div>
                            <div className='mt-8 pt-1 pb-4'>
                                <EditStep step_name={{
                                    step_name: '',
                                    step_id: uuid().slice(0,8)
                                }} edit={false} toggled={false} addStep={addStep} deleteStep={deleteStep} />
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex'>
                        <button className='my-8 mx-auto border-2 border-transparent text-white bg-primary w-3/4 py-1 rounded-sm mx-auto hover:bg-orange-500 transition'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecipeForm;