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

            <button onClick={handleClick}>Edit Recipe</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        recipes: state.recipes
    });
}

export default connect(mapStateToProps)(Recipe);
