import React, { useState } from 'react';
import axios from 'axios';
import { addNewRecipe} from '../../actions';
import { connect } from 'react-redux';
import Header from '../Header';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = (props) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const [recipe, setRecipe] = useState({
        recipe_name: '',
        ingredients: [],
        user_id: userId
    })
    const [ingredient, setIngredient] = useState({
        ingredient_name : '',
        ingredient_unit : '',
        quantity: 0,
    })

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`https://reciperts.herokuapp.com/api/recipes`, recipe)
            .then(res=>{
                props.addNewRecipe(res.data);
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
                        <h1 className='title'>Add a Recipe</h1>
                    </div>
                    <div>
                        <div>
                            <label className="label">Recipe Name</label>
                            <input value={recipe.recipe_name} onChange={handleChange} name="recipe_name" type="text" className="input"/>
                        </div>
                        {/* <div>
                            <label className="label">Species</label>
                            <input value={recipe.species} onChange={handleChange} name="species" type="text" className="input"/>
                        </div>
                        <div>
                            <label className="label">Watering Frequency <span id="smaller">(times per week)</span></label>
                            <input value={recipe.h2oFrequency < 0 ? 0 : plant.h2oFrequency} onChange={handleChange} name="h2oFrequency" type="number" className="input"/>
                        </div> */}
                    </div>
                    <div>
                        <button className='button center primary max'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, {addNewRecipe})(AddRecipeForm);