import { useEffect, useState } from "react";
import { getStores } from "../services/storeService";
import StoreCard from "../components/StoreCard";
import "../styles.css"; // Import styles

const Home = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const data = await getStores();
    console.log("API Response:", data);
    setStores(data);
  };

  return (
    <div className="home-container">
      <h1>Store Ratings</h1>
      <div className="store-list">
        {stores.length > 0 ? (
          stores.map((store) => <StoreCard key={store.id} store={store} />)
        ) : (
          <p className="no-stores">No stores available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
