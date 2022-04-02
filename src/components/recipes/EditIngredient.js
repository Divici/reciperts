import React, {useState, useEffect} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import Header from "../Header";

const EditIngredient = (props) => {
    const { ingredient_id, quantity, ingredient_unit, ingredient_name } = props.recipe;

    const [ingredient, setIngredient] = useState({
        ingredient_name : ingredient_name,
        ingredient_unit : ingredient_unit,
        quantity: quantity,
    })

    const [edit, setEdit] = useState(false)

    const handleChangeIngredient = (e) => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    }

    const handleToggle = (e) => {
        //blank for now
    }

    return (
        <div>
            <Header/>

            <form>
                <div>
                    <input value={ingredient.ingredient_name} onChange={handleChangeIngredient} name="ingredient_name" type="text" placeholder='Ingredient Name' className="input"/>
                    <input value={ingredient.ingredient_unit} onChange={handleChangeIngredient} name="ingredient_unit" type="text" placeholder='Unit of Measurement' className="input"/>
                    <label>Amount</label><input value={ingredient.quantity} onChange={handleChangeIngredient} name="quantity" type="number" placeholder='Amount' className="input"/>
                </div>
                <div>
                    {edit ? <button>Edit</button> : <button>Done</button> }
                    <button>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default EditIngredient;