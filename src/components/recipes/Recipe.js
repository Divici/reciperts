import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";
import { makeIngredientsArray, makeStepsArray } from "../utils/helpers";

const Recipe = (props) => {
    const {recipe_id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosWithAuth()
            .get(`/${recipe_id}`,)
            .then(res=>{
                setRecipe({
                    ...res.data[0],
                    ingredients: makeIngredientsArray(res.data[0].ingredients),
                    steps: makeStepsArray(res.data[0].steps)
                })
            }) 
            .catch(err=>{
                console.log(err.response.data);
            })   

    }, [recipe_id]);
    
    const [recipe, setRecipe] = useState({
        recipe_id: recipe_id,
        recipe_name: '',
        prep_time: '',
        cook_time: '',
        category: '',
        source: '',
        ingredients: [],
        steps: []
    })

    const handleClick = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }
    
    return (
        <div>
            <Header />
            <div className="">

                <header className="shadow-xl mb-8 bg-white">
                    <div className=" text-center">
                        <h1 className="font-normal font-serif tracking-normal mb-8">{recipe.recipe_name}</h1>
                        
                    </div>
                    <div className="text-sm sm:text-xl md:text-2xl text-center flex justify-center mb-2 w-10/12 mx-auto items-center font-medium">
                        <h2 className="mb-4 px-4 sm:px-6 md:px-12 py-2 tracking-widest">Prep: {recipe.prep_time}</h2> 
                        <h2 className="mb-4 px-4 sm:px-6 md:px-12 py-2 tracking-widest border-l-2 border-r-2 border-slate-400">Cook: {recipe.cook_time}</h2>
                        <h2 className="mb-4 px-4 sm:px-6 md:px-12 py-2 tracking-widest">Category: {recipe.category}</h2>
                    </div>
                </header>
                
                <section className="w-10/12 mx-auto block md:flex md:flex-row" id="recipe-section">
                    
                    {/* ==================Left Content======================= */}
                    <div className="pt-4 md:w-1/3 md:h-screen md:sticky md:top-0">
                        <button onClick={handleClick} className="mb-8 h-8 mx-auto border-2 border-transparent text-white bg-primary w-14 py-1 rounded-sm hover:bg-orange-500 transition">Edit</button>
                        <div className="mx-auto overflow-x-auto">
                            <h2 className="mb-8 w-3/4 text-4xl border-b-2">Ingredients</h2>
                            <div className="flex flex-wrap md:mr-2">
                                {
                                    recipe.ingredients && recipe.ingredients.map((ingredient, i) =>(
                                        <p key={i} className="mb-4 mx-auto w-1/2 md:w-full sm:text-lg">{ingredient.quantity} {ingredient.ingredient_unit} of {ingredient.ingredient_name}</p>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* ==================Right Content======================= */}
                    <div className="pt-4 md:w-8/12 text-lg">
                        <div className=" w-full bg-main">
                            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="meal" 
                            className="mb-8 object-cover w-full h-full"/>
                        </div>
                        <h2 className="mb-2 w-3/4 text-4xl border-b-2">Directions</h2>
                        {
                            recipe.steps && recipe.steps.map((step, i) =>(
                                <p key={i} className="mb-4">{i+1}) {step.step_name}</p>
                            ))
                        }
                    </div>
                    
                </section>
                <h3 className=" my-8 w-10/12 mx-auto text-lg font-semibold text-slate-500 border-b-2">Originally from {recipe.source}</h3>
                
            </div>

        </div>
    )
}

export default Recipe;
