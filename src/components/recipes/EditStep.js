import React, {useState} from "react";

const EditStep = (props) => {
    const { step_name, step_id} = props.step_name;
    const {toggled, edit} = props

    const [step, setStep] = useState({
        step_name: step_name || '',
        step_id: step_id || Math.floor(Date.now()/1000)
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
        props.editStep(step, step.step_id)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        props.deleteStep(step)
    }

    return (
        <div>
                <div>
                    <input disabled={toggle} value={step.step_name} onChange={handleChangeStep} name="step_name" type="text" placeholder='Instruction' className="input" />
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

export default EditStep;