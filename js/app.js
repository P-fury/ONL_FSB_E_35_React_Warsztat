import React, {useEffect} from "react";
import {createRoot} from "react-dom/client";
import {getTasks, addTask, deleteTask, finishTask} from "./api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";


const App = () => {
    const [taskData, setTaskData] = React.useState(null);


    useEffect(() => {
        getTasks(setTaskData);
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
                const updatedTask = {...taskToUpdate, status: 'closed'};

            return prevTasks.map(task =>
                task.id === taskID ? updatedTask : task)
            }
        )
    }


    if (taskData === null) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            {taskData.length}
            <NewTask onNewTask={setTaskData}/>
            <Task importedTasks={taskData} onDeleteTask={handleDeleteTask} onFinishTask={handleFinishTask}/>
        </>
    )
}


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
