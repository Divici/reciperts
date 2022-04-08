import React, {useState} from "react";

const EditIngredient = (props) => {
    const { quantity, ingredient_unit, ingredient_name, ing_id} = props.ingredient;
    const {toggled, edit} = props

    const [ingredient, setIngredient] = useState({
        quantity: quantity,
        ingredient_unit : ingredient_unit ,
        ingredient_name : ingredient_name ,
        ing_id: ing_id
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
        props.editIng(ingredient)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteIng(ingredient)
    }

    return (
        <div className="flex justify-around items-center mx-auto w-min sm:w-full">
                <div className="mx-auto py-2">
                    <input disabled={toggle} value={ingredient.ingredient_name} onChange={handleChangeIngredient} name="ingredient_name" type="text" placeholder='Ingredient Name' 
                        className="md:px-4 w-42 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100 disabled:bg-slate-300" />
                    
                    <div className="flex">
                        <label></label><input disabled={toggle} value={ingredient.quantity} onChange={handleChangeIngredient} name="quantity" type="number" placeholder='Amount' 
                            className="w-24 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100 disabled:bg-slate-300"/>
                        
                        {/* <input disabled={toggle} value={ingredient.ingredient_unit} onChange={handleChangeIngredient} name="ingredient_unit" type="text" placeholder='Units' 
                            className="w-24 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100 disabled:bg-slate-300"/>  */}

                        <select value={ingredient.ingredient_unit} 
                            disabled={toggle}
                            onChange={handleChangeIngredient} 
                            name="ingredient_unit"
                            className="w-24 py-2 text-center text-slate-500 focus:text-main mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100 disabled:bg-slate-300">
                            
                                <option value='Tbsp'>Tbsp</option>
                                <option value='tsp'>tsp</option>
                                <option value='Oz'>Oz</option>
                                <option value='fl. Oz'>fl. Oz</option>
                                <option value='Cups'>Cups</option>
                                <option value='quarts'>Quarts</option>
                                <option value='pints'>Pint</option>
                                <option value='Gallons'>Gallons</option>
                                <option value='lbs'>lbs</option>
                                <option value='mL'>ml</option>
                                <option value='g'>g</option>
                                <option value='kg'>kg</option>
                                <option value='Liters'>Liters</option>
                        </select>       
                    </div>
                </div>

                <div className="mx-auto pl-2">
                    {edit && 
                        <div className="mx-auto">
                            { toggle ? 
                                <button onClick={handleToggle} className="mr-2 mt-1 border-2 border-transparent text-white bg-main w-14 py-1 rounded-sm hover:bg-slate-500 transition">Edit</button> 
                            : 
                                <button onClick={handleEdit} className="mr-2 mt-1 border-2 border-transparent text-white bg-main w-14 py-1 rounded-sm hover:bg-slate-500 transition">Done</button>}
                                <button onClick={handleDelete} className="mt-1 border-2 border-transparent text-white bg-red-600 w-14 py-1 rounded-sm hover:text-red-500 hover:bg-white hover:border-red-400 transition">Delete</button>
                        </div>
                    }
                    {!edit && 
                        <div>
                            <button onClick={handleAdd} className="border-2 border-transparent text-white bg-main w-16 py-1 rounded-sm mx-auto hover:bg-slate-500 transition">Add</button>
                        </div>
                    }
                </div>

        </div>
    )
}

export default EditIngredient;