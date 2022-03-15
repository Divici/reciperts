import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import Header from "../Header";

const EditRecipe = (props) => {
    const navigate = useNavigate();
    const {recipe_id} = useParams();

    const [recipe, setRecipe] = useState({
        recipe_name: '',
        prep_time: 0,
        cook_time: 0,
        category: '',
        source: '',
        ingredients: [],
        steps: [],
    })

    useEffect(()=>{
        // axios.get(`https://plant-water-tracker.herokuapp.com/api/plants/${id}`)
		// 	.then(resp=>{
		// 		setPlant(resp.data[0]);
		// 	})
		// 	.catch(err=>{
		// 		console.log(err);
		// 	})
        // axiosWithAuth()
        //     .put(`/recipes/${recipe_id}`, recipe)
        //         .then(res=>{
        //             props.addNewRecipe(res.data);
        //             navigate(`/dashboard`);
        //         }) 
        //         .catch(err=>{
        //             console.log(err.response.data);
        //         })   
    }, []);
    
    return (
        <div>

        </div>
    )
}

export default EditRecipe;