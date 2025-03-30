const API_URL = "http://localhost:5000/api/stores";

export const getStores = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching stores ❌:", error);
        return [];
    }
};

