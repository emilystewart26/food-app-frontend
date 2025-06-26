"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function AddToFavourites({ restaurantId }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { getToken } = useAuth();

  // Check if this restaurant is already in favourites
  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites`,
          config
        );

        const favourites = Array.isArray(res.data.favourites)
          ? res.data.favourites
          : [];

        const found = favourites.some(
          (fav) =>
            fav._id === restaurantId || fav.restaurantId === restaurantId
        );
        setIsFavourite(found);
      } catch (error) {
        console.error("Error fetching favourites", error);
      }
    };

    checkFavourite();
  }, [restaurantId, getToken]);

  //  Toggle favourite on button click
  const handleToggleFavourite = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites/${restaurantId}`;

      if (isFavourite) {
        await axios.delete(url, config);
        setIsFavourite(false);
      } else {
        await axios.post(url, {}, config);
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
