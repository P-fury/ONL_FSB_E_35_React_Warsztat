import React, {useState} from "react";
import {addTask} from "./api/tasks";


const NewTask = ({onNewTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const submitButton = (e) => {
        e.preventDefault();
        addTask({
            title: title,
            description: description,
            status: "",
        }, (newTask) => {
            onNewTask((prevTaskData) => [
                ...prevTaskData,
                newTask
            ])
        })
    }


    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="title"
                               placeholder="Title"
                               onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               name="description"
                               placeholder="Description"
                               onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-info" onClick={submitButton}>Add new task
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default NewTask;






