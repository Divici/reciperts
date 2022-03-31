import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeCard from "../recipes/RecipeCard";
import Header from "../Header";
import { fetchSuccess } from "../../actions";
import './Dashboard.css'

const Dashboard = (props) => {
    const recipes = props.recipes;
    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://reciperts.herokuapp.com/api/users/${user_id}/recipes`)
        .then(resp => {
            props.fetchSuccess(resp.data.userRecipes);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const [recipe, setRecipe] = useState({
        recipe_id: Math.floor(Date.now()/1000),
        recipe_name: '',
        user_id: user_id
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
    }

    const handleClick = (e) => {
        e.preventDefault();
        setDisplayAdd(!displayAdd)
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

export default connect(mapStateToProps, {fetchSuccess})(Dashboard);