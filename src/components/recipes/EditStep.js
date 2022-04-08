import React, {useState} from "react";
import './Scrollbar.css'

const EditStep = (props) => {
    const { step_name, step_id} = props.step_name;
    const {toggled, edit} = props

    const [step, setStep] = useState({
        step_name: step_name,
        step_id: step_id
    })

    const [toggle, setToggle] = useState(toggled)

    const handleChangeStep = (e) => {
        setStep({
            ...step,
            [e.target.name]: e.target.value
        });
    }

    const handleToggle = (e) => {
        e.preventDefault();
        setToggle(!toggled)
    }

    const handleAdd = (e) => {
        e.preventDefault();
        props.addStep(step)
        setStep({
            step_name : '',
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setToggle(true)
        props.editStep(step)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteStep(step)
    }

    return (
        <div>
                <div className="flex">
                    <textarea disabled={toggle} value={step.step_name} onChange={handleChangeStep} name="step_name" type="textarea" placeholder='Instruction' 
                        className="customScrollbar mt-2 mx-auto md:px-4 w-4/5 py-4 text-slate-500 focus:text-main border rounded-md focus:outline-none focus:ring-1 focus:ring-main bg-slate-100 disabled:bg-slate-300" 
                        />
                </div>

                <div className="flex pl-2 my-1">
                    {edit && 
                        <div className="mx-auto">
                            { toggle ? 
                                <button onClick={handleToggle} className="mr-2 mt-1 border-2 border-transparent text-white bg-main w-14 py-1 rounded-sm hover:bg-slate-500 transition">Edit</button> 
                            : 
                                <button onClick={handleEdit} className="mr-2 mt-1 border-2 border-transparent text-white bg-main w-14 py-1 rounded-sm hover:bg-slate-500 transition">Done</button>}
                                <button onClick={handleDelete} className="mt-1 border-2 border-transparent text-white bg-red-600 w-14 py-1 rounded-sm hover:text-red-500 hover:bg-white hover:border-red-400  transition">Delete</button>
                        </div>
                    }
                    {!edit && 
                        <div>
                            <button onClick={handleAdd}className="border-2 border-transparent text-white bg-main w-16 py-1 rounded-sm mx-auto hover:bg-slate-500 transition">Add</button>
                        </div>
                    }
                </div>

        </div>
    )
}

export default EditStep;