import React, {useState} from "react";
import { connect } from 'react-redux';
import axiosWithAuth from "../utils/axiosWithAuth";
import { useNavigate } from 'react-router-dom';
import { deleteRecipe } from "../../actions";

const RecipeCard = (props) => {
    const { recipe_name, prep_time, cook_time, category, recipe_id, source } = props.recipe;
    const navigate = useNavigate();

    const [confirm, setConfirm] = useState(false);

    const handleClick = () => {
        navigate(`/dashboard/view/${recipe_id}`);
    }

    const handleEdit = () => {
        navigate(`/dashboard/edit/${recipe_id}`);
    }

    const handleConfirm = () => {
        setConfirm(!confirm)
    }

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`/${recipe_id}`)
            .then(resp=>{
                props.deleteRecipe(recipe_id)
            }) 
            .catch(err=>{
                console.log(err);
            })   
    }

    return (
       
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl mb-8 mx-4">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img src="https://images.pexels.com/photos/11566303/pexels-photo-11566303.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="meal" 
                    className="h-48 w-full object-cover md:h-full md:w-48"/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-lg text-main font-bold border-b-2 mb-4">
                        {recipe_name}
                    </div>
                    <div className="flex mb-2">
                        <div className="mr-8">
                            <p className="mt-1 text-lg leading-tight font-medium text-black">Prep Time: </p><p className="text-primary">{prep_time}</p>
                        </div>
                        <div className="mx-auto">
                            <p className=" mt-1 text-lg leading-tight font-medium text-black">Cook Time: </p><p className="text-primary">{cook_time}</p>
                        </div>
                    </div>
                        
                    <p className="mt-2 mb-6 text-slate-500">Originally from {source}.</p>
                    <div className="flex justify-around flex-row">
                        <button onClick={handleClick} className='border-2 border-transparent text-white bg-primary w-14 py-1 rounded-sm mx-auto hover:bg-orange-500 transition'>View</button>
                        <button onClick={handleEdit} className='border-2 border-transparent text-white bg-primary w-14 py-1 rounded-sm mx-auto hover:bg-orange-500 transition'>Edit</button>
                        <button onClick={handleConfirm} className='border-2 border-transparent text-white bg-red-800 w-14 py-1 rounded-sm mx-auto hover:bg-red-600  hover:border-red-700 transition-colors'>Delete</button>
                    </div>
                    {confirm && (
                        <div className="text-center">
                            <p className="mt-2 text-red-600">...delete {recipe_name}?</p>
                            <button onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-800  hover:border-red-700 w-8 rounded-sm mx-2">yes</button> 
                            <button onClick={handleConfirm} className="text-white bg-slate-500 hover:bg-slate-600 w-8 rounded-sm mx-2">no</button>
                        </div>
                    )}

                </div>
            </div>
        </div>

    )
}

export default connect(null, {deleteRecipe})(RecipeCard);