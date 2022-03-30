import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../Header";

const Recipe = (props) => {
    const {recipe_id} = useParams();
    const recipes = props.recipes;
    const navigate = useNavigate();

    const searched = []

    useEffect(()=>{
       
        axios.get(`https://reciperts.herokuapp.com/api/recipes/:${recipe_id}`,)
            .then(res=>{
                console.log(res);
                //setRecipe(res.data[0])
            }) 
            .catch(err=>{
                console.log(err.response.data);
            })   
    }, []);

    const [recipe, setRecipe] = useState({
        recipe_id: recipe_id,
        recipe_name: '',
        prep_time: 0,
        cook_time: 0,
        category: '',
        source: '',
        ingredients: [],
        steps: []
    })
    
    // recipes.map(recipe=> {
    //     if(recipe.recipe_id === recipe_id){
    //         searched.push(recipe)
    //     }
    // })

    // console.log('===============================================');
    // console.log(recipe);
    // console.log('===============================================');


    const handleClick = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }
    
    return (
        <div>
            <Header />

            <header>
                <div>
                    <h1>recipe name: {recipe.recipe_name}</h1>
                    <h2>category: {recipe.category}</h2>
                </div>
                <div className="inline-block capitalize">
                    <h2>prep time: {recipe.prep_time}</h2>
                    <h2>{recipe.prep_time}</h2>
                    <button onClick={handleClick} className="primary">Edit</button>
                </div>
            </header>

            <section>
                <div className="left-content static">
                    <h2>Ingredients</h2>
                    {
                        recipe.ingredients && recipe.ingredients.map(ingredient=>(
                            <p>{ingredient.quantity} {ingredient.ingredient_unit} {ingredient.ingredient_name}</p>
                        ))
                    }
                </div>
                <div className="right-content scroll">
                    <h2>Directions</h2>
                    {
                        recipe.steps && recipe.steps.map(step=>(
                            <p>{step.step_number}) {step.step_instruction}</p>
                        ))
                    }
                </div>
            </section>

            <footer>
                <h3>From {recipe.source}</h3>
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
