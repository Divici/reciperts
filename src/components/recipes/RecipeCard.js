import React from "react";
import { useNavigate } from 'react-router-dom';

const RecipeCard = (props) => {
    const { recipe_name, prep_time, cook_time, category, recipe_id } = props.recipe;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/view/${recipe_id}`);
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
        </div>
    )
}

export default RecipeCard;