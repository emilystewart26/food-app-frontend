"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs"; // Clerk authentication hook

export default function AddToFavourites({ restaurantId }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await axios.get(
          "http://localhost:3001/api/users/favourites",
          config
        );

        // Safely extract favourites array
        const favourites = Array.isArray(res.data)
          ? res.data
          : res.data.favourites || [];

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

  const handleToggleFavourite = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isFavourite) {
        await axios.delete(
          `http://localhost:3001/api/users/favourites/${restaurantId}`,
          config
        );
        setIsFavourite(false);
      } else {
        await axios.post(
          `http://localhost:3001/api/users/favourites/${restaurantId}`,
          {},
          config
        );
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
