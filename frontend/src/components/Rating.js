import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles.css";

const Rating = ({ storeId }) => {
    const { token } = useAuth();
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    const submitRating = async (newRating) => {
        setRating(newRating);
    
        const requestBody = { storeId, rating: newRating }; 
        console.log("Submitting rating:", requestBody); // Debugging log
    
        const response = await fetch("http://localhost:5000/api/stores/rate-store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
            },
            body: JSON.stringify(requestBody),
        });
    
        const data = await response.json();
        console.log("Server response:", data); // Debugging log
        setMessage(data.message);
    };
    

    return (
        <div className="rating-container">
            <h3>Rate this store:</h3>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => submitRating(star)}
                    className={rating >= star ? "star-selected" : "star"}
                >
                    ★
                </span>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Rating;
