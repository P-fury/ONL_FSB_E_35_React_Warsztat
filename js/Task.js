import React, {useState} from "react";
import {addOperation} from "./api/operations";
import Operation from "./Operation";


const Task = ({
                  importedTasks,
                  onDeleteTask,
                  onFinishTask,
                  formStatus,
                  toggleFormStatus,
                  operations,
                  handleAddOperation
              }) => {
    const [operation, setOperation] = useState('');

    const [addTimeStatus, setAddTimeStatus] = useState({});
    const [addTimeForm, setAddTimeForm] = useState({});

    const onTimeFormChange = (operationID) => {
        setAddTimeForm(prevState => ({
            ...prevState,
            [operationID]: !prevState[operationID] // Toggling form display
        }));
    };


    return (<>
            {importedTasks.map((task) => (
                <section key={task.id} className="card mt-5 shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{task.title}</h5>
                            <h6 className="card-subtitle text-muted">{task.description}</h6>
                        </div>

                        <div>

                            {task.status !== 'closed' && (
                                <>

                                    <button onClick={() => toggleFormStatus(task.id)}
                                            className="btn btn-info btn-sm mr-2">
                                        Add operation
                                        <i className="fas fa-plus-circle ml-1"></i>
                                    </button>


                                    <button onClick={() => onFinishTask(task.id)} className="btn btn-dark btn-sm">
                                        Finish
                                        <i className="fas fa-archive ml-1"></i>
                                    </button>
                                </>
                            )}

                            <button onClick={() => onDeleteTask(task.id)}
                                    className="btn btn-outline-danger btn-sm ml-2">
                                <i className="fas fa-trash false"></i>
                            </button>
                        </div>
                    </div>
                    {formStatus[task.id] === true && (<>
                        <div className="card-body">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleAddOperation(task.id, operation);
                                setOperation("");

                            }}>
                                <div className="input-group">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Operation description"
                                           onChange={(e) => setOperation(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button type='submit'
                                                className="btn btn-info">
                                            Add
                                            <i className="fas fa-plus-circle ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>)}


                    <Operation operations={operations} taskID={task.id} addTimeStatus={addTimeStatus}
                               addTimeForm={addTimeForm} onTimeFormChange={onTimeFormChange}/>


                </section>

            ))}
        </>
    )

}


export default Task;