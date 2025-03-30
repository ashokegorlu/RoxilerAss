import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import Rating from "./Rating";
import "../styles.css"; // Import styles

const StoreCard = ({ store }) => {
  const [randomRating, setRandomRating] = useState(store.rating || 0);

  useEffect(() => {
    if (!store.rating) {
      setRandomRating(Math.floor(Math.random() * 5) + 1); // Random rating between 1-5
    }
  }, [store]);

  if (!store) return null; // ✅ Prevent crash if store is undefined

  return (
    <div className="store-card">
      <h2>{store.name}</h2>
      <p>{store.address}</p>
      <p>Rating: {randomRating}/5</p>
      <RatingStars rating={randomRating} />
      <Rating storeId={store.id} />
    </div>
  );
};

export default StoreCard;
