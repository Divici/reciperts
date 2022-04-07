import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeCard from "../recipes/RecipeCard";
import Header from "../Header";
import { fetchSuccess } from "../../actions";
import {BsFillArrowUpSquareFill} from 'react-icons/bs'

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
                    navigate(`/dashboard/edit/${recipe.recipe_id}`);
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
        <div id="top" >
            <div className="mb-4 bg-white shadow-xl sticky top-0">
                <Header/>
                <h1 className="text-center font-normal font-serif">My Recipes</h1>
                {/* search and sort by go here*/}

                {!displayAdd && 
                    <div className="flex justify-center"><button className='mb-10 mt-2 border-2 border-transparent text-white bg-primary py-1 px-2 rounded-md hover:bg-orange-500 transition' onClick={handleClick}>Add a Recipe</button></div>
                }
                {displayAdd && <form className="flex flex-col justify-center items-center">
                    <div>
                        <input
                            className=" px-4 py-2 text-center mt-2 mx-auto border-2 border-slate-500 rounded-md focus:outline-none focus:ring-1 focus:ring-main"
                            type='text'
                            id="recipe_name"
                            value={recipe.recipe_name}
                            placeholder='Name of Recipe'
                            onChange={handleChange}
                        />
                    </div>
                    <button className='my-4 border-2 border-transparent text-white bg-slate-600 w-24 py-1 rounded-md mx-auto hover:bg-slate-500 transition' onClick={handleClick}>Cancel</button>
                    <button className='mb-4 border-2 border-transparent text-white bg-primary w-24 py-1 rounded-md mx-auto hover:bg-orange-500 transition' onClick={handleSubmit}>Submit</button>
                </form>}
            </div>
            <section className="flex flex-wrap mx-auto">
                {
                    recipes.map(recipe=><RecipeCard key={recipe.recipe_id} recipe={recipe}/>)
                }
            </section>
            <a href='#top'><BsFillArrowUpSquareFill className='text-primary bg-white text-4xl sticky left-full bottom-8 mr-2'/></a>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        recipes: state.recipes,
    });
}

export default connect(mapStateToProps, {fetchSuccess})(Dashboard);