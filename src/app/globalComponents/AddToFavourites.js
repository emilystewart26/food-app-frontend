"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddToFavourites({ restaurantId }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    
  }, []);

  const handleToggleFavourite = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (isFavourite) {
        await axios.delete(`http://localhost:3001/api/favourites/${restaurantId}`, config);
        setIsFavourite(false);
      } else {
        await axios.post(`http://localhost:3001/api/favourites/${restaurantId}`, {}, config);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favourite", error);
    }
  };

  return (
    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      onClick={handleToggleFavourite}
    >
      {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
    </button>
  );
}
