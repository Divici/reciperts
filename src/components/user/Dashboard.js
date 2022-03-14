import React, {useState} from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import RecipeCard from "../recipes/RecipeCard";
import Header from "../Header";

const Dashboard = (props) => {
    const recipes = props.recipes;
    const navigate = useNavigate();

    const [name, setName] = useState({
        recipe_name: ''
    })

    //const [displayAdd, setDisplayAdd] = useState(false);

    const handleChange = (e) => {
        setName({
            ...name,
            [e.target.id] : e.target.value
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     //need to call dispatch here

    //     axios.post(`https://reciperts.herokuapp.com/api/recipes`, recipe)
    //         .then(res=>{
    //             props.setPlants([...props.plants, res.data]);
    //             console.log("my plant", plant)
    //             push(`/my-plants`);
	// 		})
	// 		.catch(err=>{
	// 			console.log(err.response.data);
	// 		})
    // }

    const handleClick = (e) => {
        e.preventDefault();
        //setDisplayAdd(!displayAdd)
        navigate('/add-recipe')
    }

    return(
        <div>
            <Header/>
            <h1>Recipe Book</h1>
            {/* search and sort by go here*/}

            <button className='button primary' onClick={handleClick}>Add a Recipe</button>
            {/* {displayAdd && <form className="form" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="input"
                        type='text'
                        id="recipe_name"
                        value={name.recipe_name}
                        placeholder='Name of Recipe'
                        onChange={handleChange}
                    />
                </div>
                <button className='button primary' onClick={handleClick}>Cancel</button>
            </form>} */}

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