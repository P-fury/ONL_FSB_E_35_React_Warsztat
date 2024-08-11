import {API_KEY, API_URL} from "./constans";


export const getTasks = async (successCallback) => {

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }

};

export const addTask = async (taskToAddData, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskToAddData),

        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
}


export const deleteTask = async (taskID, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskID}`, {
            method: "DELETE",
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },

        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }



}


export const finishTask = async (taskWithIdDATA, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskWithIdDATA.id}`, {
            method: "PUT",
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...taskWithIdDATA, status: 'closed'}),

        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }



}