import React, {useEffect} from "react";
import {createRoot} from "react-dom/client";
import {getTasks} from "./api/tasks";
import NewTask from "./NewTask";


const App = () => {
    const [taskData, setTaskData] = React.useState(null);

    useEffect(() => {
        getTasks(setTaskData);
    }, []);

    if (taskData === null) {
        return <h1>Loading...</h1>
    }

    const onNewTask = () => {
        console.log(taskData);
    }

    return (
        <>
            {taskData.length}
            <NewTask onNewTask={onNewTask}/>
        </>
    )
}


const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);
