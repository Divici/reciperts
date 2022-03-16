import React, {useState} from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeCard from "../recipes/RecipeCard";
import Header from "../Header";

const Dashboard = (props) => {
    const recipes = props.recipes;
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        recipe_id: Math.floor(Date.now()/1000),
        recipe_name: '',
        user_id: userId
    })

    const [displayAdd, setDisplayAdd] = useState(false);

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.id] : e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosWithAuth()
            .post('/', recipe)
                .then(res=>{
                    navigate(`/dashboard/add/${recipe.recipe_id}`);
                }) 
                .catch(err=>{
                    console.log(err.response.data);
                })   
        // axios.post(`https://reciperts.herokuapp.com/api/recipes`, recipe)
        //     .then(res=>{
        //         props.setPlants([...props.plants, res.data]);
        //         console.log("my plant", plant)
        //         push(`/my-plants`);
		// 	})
		// 	.catch(err=>{
		// 		console.log(err.response.data);
		// 	})
    }

    const handleClick = (e) => {
        e.preventDefault();
        setDisplayAdd(!displayAdd)
        //navigate('/add-recipe')
    }

    return(
        <div>
            <Header/>
            <h1>Recipe Book</h1>
            {/* search and sort by go here*/}

            {!displayAdd && <button className='button primary' onClick={handleClick}>Add a Recipe</button>}
            {displayAdd && <form className="form">
                <div>
                    <input
                        className="input"
                        type='text'
                        id="recipe_name"
                        value={recipe.recipe_name}
                        placeholder='Name of Recipe'
                        onChange={handleChange}
                    />
                </div>
                <button className='button primary' onClick={handleClick}>Cancel</button>
                <button className='button primary' onClick={handleSubmit}>Submit</button>
            </form>}

            <section className="cards container">
                {
                    recipes.map(recipe=><RecipeCard key={recipe.recipe_id} recipe={recipe}/>)
                }
            </section>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return ({
        recipes: state.recipes
    });
}

export default connect(mapStateToProps)(Dashboard);