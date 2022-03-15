import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";

const Recipe = (props) => {
    const {recipe_id} = useParams();
    const recipes = props.recipes;
    const navigate = useNavigate();

    const { 
        recipe_name, 
        prep_time, 
        cook_time, 
        category, 
        source, 
        ingredients, 
        steps
    } = recipes.filter(recipe=> recipe.recipe_id === recipe_id)

    const handleClick = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }
    
    return (
        <div>
            <Header />

            <header>
                <div>
                    <h1>{recipe_name}</h1>
                    <h2>{category}</h2>
                </div>
                <div className="inline-block capitalize">
                    <h2>{prep_time}</h2>
                    <h2>{prep_time}</h2>
                    <button onClick={handleClick} className="primary">Edit</button>
                </div>
            </header>

            <body>
                <div className="left-content static">
                    <h2>Ingredients</h2>
                    {
                        ingredients.map(ingredient=>(
                            <p>{ingredient.quantity} {ingredient.ingredient_unit} {ingredient.ingredient_name}</p>
                        ))
                    }
                </div>
                <div className="right-content scroll">
                    <h2>Directions</h2>
                    {
                        steps.map(step=>(
                            <p>{step.step_number}) {step.step_instruction}</p>
                        ))
                    }
                </div>
            </body>

            <footer>
                <h3>From {source}</h3>
            </footer>

        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        recipes: state.recipes
    });
}

export default connect(mapStateToProps)(Recipe);
