import {API_KEY, API_URL} from "./constans";

export const getOperations = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
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



export const addOperation = async (taskID,taskToAddData, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskID}/operations`, {
            method: "POST",
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({description: taskToAddData, timeSpent: 0}),

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