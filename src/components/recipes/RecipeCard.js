import React from "react";

const RecipeCard = (props) => {
    const { recipe_name, prep_time, cook_time, category } = props.recipe;
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
        </div>
    )
}

export default RecipeCard;