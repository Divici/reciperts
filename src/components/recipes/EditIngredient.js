import React, {useState} from "react";
import { connect } from "react-redux";
import { addIngredient } from "../../actions";

const EditIngredient = (props) => {
    const { quantity, ingredient_unit, ingredient_name, ing_id} = props.ingredient;
    const {toggled, edit} = props

    const [ingredient, setIngredient] = useState({
        quantity: quantity || 0,
        ingredient_unit : ingredient_unit || '',
        ingredient_name : ingredient_name || '',
        ing_id: ing_id || Math.floor(Date.now()/1000)
    })

    const [toggle, setToggle] = useState(toggled)

    const handleChangeIngredient = (e) => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    }

    const handleToggle = (e) => {
        e.preventDefault();
        setToggle(!toggled)
    }

    const handleAdd = (e) => {
        e.preventDefault();
        props.addIng(ingredient)
        setIngredient({
            quantity: 0,
            ingredient_unit : '',
            ingredient_name : '',
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setToggle(true)
        props.editIng(ingredient, ingredient.ing_id)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteIng(ingredient)
    }

    return (
        <div>
                <div>
                    <input disabled={toggle} value={ingredient.ingredient_name} onChange={handleChangeIngredient} name="ingredient_name" type="text" placeholder='Ingredient Name' className="input" />
                    <input disabled={toggle} value={ingredient.ingredient_unit} onChange={handleChangeIngredient} name="ingredient_unit" type="text" placeholder='Unit of Measurement' className="input"/>
                    <label>Amount</label><input disabled={toggle} value={ingredient.quantity} onChange={handleChangeIngredient} name="quantity" type="number" placeholder='Amount' className="input"/>
                </div>
                <div>
                    {edit && 
                        <div>
                            { toggle ? <button onClick={handleToggle}>Edit</button> : <button onClick={handleEdit}>Done</button>}
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    }
                    {!edit && 
                        <div>
                            <button onClick={handleAdd}>Add</button>
                        </div>
                    }
                </div>

        </div>
    )
}

export default connect(null, {addIngredient})(EditIngredient);