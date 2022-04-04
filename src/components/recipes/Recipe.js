import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";
import { makeIngredientsArray } from "../utils/helpers";

const Recipe = (props) => {
    const {recipe_id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosWithAuth()
            .get(`/${recipe_id}`,)
            .then(res=>{
                setRecipe({
                    ...res.data[0],
                    ingredients: makeIngredientsArray(res.data[0].ingredients)
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
        steps: ''
    })

    const handleClick = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }
    
    return (
        <div>
            <Header />

            <header>
                <div>
                    <h1>{recipe.recipe_name}</h1>
                    <h2>category: {recipe.category}</h2>
                </div>
                <div className="inline-block capitalize">
                    <h2>prep time: {recipe.prep_time}</h2>
                    <h2>cook time: {recipe.cook_time}</h2>
                </div>
                <button onClick={handleClick} className="primary">Edit</button>
            </header>

            <section>
                <div className="left-content static">
                    <h2>Ingredients</h2>
                    {
                        recipe.ingredients && recipe.ingredients.map((ingredient, i) =>(
                            <p key={i}>{ingredient.quantity} {ingredient.ingredient_unit} of {ingredient.ingredient_name}</p>
                        ))
                    }
                </div>
                <div className="right-content scroll">
                    <h2>Directions</h2>
                    <p>{recipe.steps}</p>
                </div>
            </section>

            <button onClick={handleClick} className="primary">Edit</button>

            <footer>
                <h3>From {recipe.source}</h3>
            </footer>

        </div>
    )
}

export default Recipe;
