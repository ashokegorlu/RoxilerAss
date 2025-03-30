const API_URL = "http://localhost:5000/api/admin";

export const getStats = async () => {
    const response = await fetch(`${API_URL}/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.json();
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.json();
};

export const getStores = async () => {
    const response = await fetch(`${API_URL}/stores`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.json();
};

export const addUser = async (userData) => {
    const response = await fetch(`${API_URL}/add-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(userData)
    });
    return response.json();
};
