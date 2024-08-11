import React, {useEffect} from "react";
import {createRoot} from "react-dom/client";
import {getTasks, addTask, deleteTask, finishTask} from "./api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";
import {addOperation, getOperations} from "./api/operations";


const App = () => {
    const [taskData, setTaskData] = React.useState(null);
    const [formStatus, setFormStatus] = React.useState(false);

    const [operations, setOperations] = React.useState(null);



    useEffect(() => {

        getTasks((tasks) => {
            setTaskData(tasks);
            tasks.forEach(task => {
                getOperations(task.id, (taskOperations) => {
                    setOperations(prevOperations => ({
                        ...prevOperations,
                        [task.id]: taskOperations
                    }));
                });
            });
        });
    }, []);


    /* USUWANIE CALEGO ZDANIA */
    const handleDeleteTask = (taskID) => {
        deleteTask(taskID, () => {
            setTaskData((prevTasks) => prevTasks.filter(task => task.id !== taskID));
        });
    };
    /* FINISH ZDANIA */

    const handleFinishTask = (taskID) => {
        setTaskData(prevTasks => {
            const taskToUpdate = prevTasks.find(task => task.id === taskID);

            if (taskToUpdate) {
                finishTask(taskToUpdate, (updatedTaskFromServer) => {
                    setTaskData(prevTasks =>
                        prevTasks.map(task =>
                            task.id === taskID ? updatedTaskFromServer : task
                        )
                    );
                });
            }

            return prevTasks;
        });
    };


    /* STATUS FORMULARZU ZADANIA */
    const toggleFormStatus = (taskID) => {
        setFormStatus(prevStatus => ({
            ...prevStatus,
            [taskID]: !prevStatus[taskID]
        }));
    }


    /* DODAWANIE OPERACJI */
    const handleAddOperation = (taskID, taskToAddData) => {
        addOperation(taskID, taskToAddData, (newOperation) => {
            setOperations(prevOperations => ({
                ...prevOperations,
                [taskID]: [...(prevOperations[taskID] || []), newOperation],

            }));
            toggleFormStatus(taskID)
        });
    };


    if (taskData === null) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <NewTask onNewTask={setTaskData}/>
            <Task importedTasks={taskData} onDeleteTask={handleDeleteTask} onFinishTask={handleFinishTask}
                  formStatus={formStatus} toggleFormStatus={toggleFormStatus} operations={operations}
                  handleAddOperation={handleAddOperation}

            />


        </>
    )
}


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
