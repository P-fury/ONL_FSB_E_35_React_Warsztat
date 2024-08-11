import React from "react";

const Operation = ({operations, taskID, addTimeStatus, addTimeForm, onTimeFormChange}) => {
    return (
        <>
            {operations && operations[taskID] && operations[taskID].length > 0 && (
                operations[taskID].map(operation => (
                    <li key={operation.id}
                        className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {operation.description}
                            {addTimeStatus[operation.id] && (
                                <span className="badge badge-success badge-pill ml-2">
                                {/* Możesz zastąpić to odpowiednimi danymi, jeśli chcesz wyświetlać więcej informacji */}
                            </span>
                            )}
                        </div>
                        {addTimeForm[operation.id] && (
                            <form className="d-flex align-items-center" style={{flex: 2}} >
                                <div className="input-group input-group-sm" >
                                    <input type="number"
                                           className="form-control"
                                           placeholder="Spent time in minutes"
                                           style={{width: "12rem"}}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-success"><i className="fas fa-save"></i>
                                        </button>
                                        <button className="btn btn-outline-dark"><i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        <div>
                            {!addTimeForm[operation.id] && (<>
                                    <button onClick={() => onTimeFormChange(operation.id)}
                                            className="btn btn-outline-success btn-sm mr-2">
                                        Add time
                                        <i className="fas fa-clock ml-1"></i>
                                    </button>


                                    <button className="btn btn-outline-danger btn-sm">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))
            )}
        </>
    );
}

export default Operation;
