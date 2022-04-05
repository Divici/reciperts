import React from "react";
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

    const handleEdit = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`/${recipe_id}`)
            .then(resp=>{
                props.deleteRecipe(recipe_id)
            }) 
            .catch(err=>{
                console.log(err);
            })   
    }

    return (
        <div className="card">
            <div className="img-box">
                <img src="https://images.pexels.com/photos/11566303/pexels-photo-11566303.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="meal" />
            </div>
            <div className="card-content">
                <div>
                    <h2>{recipe_name}</h2>
                    <h3>Category: {category}</h3>
                </div>
                <div>
                    <p>Prep Time: {prep_time}</p>
                    <p>Cook Time: {cook_time}</p>
                </div>
                <div>
                    <button onClick={handleClick} className='secondary'>View</button>
                    <button onClick={handleEdit} className='secondary'>Edit</button>
                    <button onClick={handleDelete} className='secondary'>Delete</button>
                </div>
            </div>
            
            
        </div>
    )
}

export default connect(null, {deleteRecipe})(RecipeCard);