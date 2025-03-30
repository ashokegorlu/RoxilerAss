import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStores } from "../services/storeService"; // ✅ CORRECT
import RatingStars from "../components/RatingStars";

const StoreDetail = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStores.fetchStoreDetails(id);
      setStore(data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {store ? (
        <>
          <h2>{store.name}</h2>
          <p>{store.description}</p>
          <RatingStars rating={store.averageRating} />
        </>
      ) : (
        <p>Loading store details...</p>
      )}
    </div>
  );
};

export default StoreDetail;
