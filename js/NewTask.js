import React, {useState} from "react";


const NewTask = () => {
    const [formState, setFormState] = useState({})
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.name;
        setFormState({...formState, [target.name]: value});
    }

    return (
        <div className="card shadow"  onSubmit={propagateSubmit}>
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               onChange={handleInputChange}
                               value={formState.title}
                               placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="description"
                               value={formState.description}
                               onChange={handleInputChange}

                               placeholder="Description"/>
                    </div>
                    <button className="btn btn-info" type="submit">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default NewTask;






