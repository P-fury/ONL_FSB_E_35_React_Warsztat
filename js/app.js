import React, {useEffect} from "react";
import {createRoot} from "react-dom/client";
import {getTasks, addTask} from "./api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";




const App = () => {
    const [taskData, setTaskData] = React.useState(null);


    useEffect(() => {
        getTasks(setTaskData);
    }, []);

    if (taskData === null) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            {taskData.length}
            <NewTask onNewTask={setTaskData}  />
            <Task importedTasks={taskData} />
        </>
    )
}


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
