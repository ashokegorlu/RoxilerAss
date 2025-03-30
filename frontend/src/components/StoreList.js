import React, { useEffect, useState } from "react";
import "../styles.css"; // Import styles if needed

const StoreList = () => {
    const [stores, setStores] = useState([]); // Ensure stores is always an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/stores");
                if (!response.ok) {
                    throw new Error("Failed to fetch stores.");
                }
                const data = await response.json();
                setStores(data); // Update stores state
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <p>Loading stores...</p>;
    if (error) return <p className="error-message">❌ {error}</p>;

    return (
        <div className="store-list-container">
            <h2>Store Listings</h2>
            {stores.length === 0 ? (
                <p>No stores available.</p>
            ) : (
                <ul>
                    {stores?.map((store) => (
                        <li key={store.id} className="store-card">
                            <h3>{store.name}</h3>
                            <p>{store.address}</p>
                            <p>Overall Rating: {store.overallRating || "N/A"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StoreList;
