import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import axiosWithAuth from "../utils/axiosWithAuth";
import { useNavigate } from 'react-router-dom';
import { deleteRecipe } from "../../actions";

const RecipeCard = (props) => {
    const { recipe_name, prep_time, cook_time, category, recipe_id } = props.recipe;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/view/${recipe_id}`);
    }

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`/${recipe_id}`)
            .then(resp=>{
                console.log(resp);
                props.deleteRecipe(recipe_id)
            }) 
            .catch(err=>{
                console.log(err);
            })   
    }

    return (
        <div className="card">
            <div>
                <h2>{recipe_name}</h2>
                <h3>Category: {category}</h3>
            </div>
            <div>
                <p>Prep Time: {prep_time}</p>
                <p>Cook Time: {cook_time}</p>
            </div>
            <button onClick={handleClick} className='button secondary'>View Recipe</button>
            <button onClick={handleDelete} className='button secondary'>Delete</button>
        </div>
    )
}

export default connect(null, {deleteRecipe})(RecipeCard);