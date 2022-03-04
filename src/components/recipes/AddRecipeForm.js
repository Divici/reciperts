import React, { useState } from 'react';
import axios from 'axios';
import { addNewRecipe} from '../../actions';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const AddRecipeForm = (props) => {
    const {push} = useHistory();
    const userId = localStorage.getItem("user_id");

    const [recipe, setRecipe] = useState({
        //recipeFields
        user_id: userId
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
                push(`/my-recipes`);
            })
            .catch(err=>{
                console.log(err.response.data);
            })
    }

    return(
        <div>

        </div>
    )
}

export default connect(null, {addNewRecipe})(AddRecipeForm);