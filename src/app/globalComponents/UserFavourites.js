"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function UserFavourites() {
  const [favourites, setFavourites] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavourites(res.data.favourites || []);
      } catch (err) {
        console.error("Failed to fetch favourites", err);
      }
    };

    fetchFavourites();

    const onFavUpdated = () => fetchFavourites();
    window.addEventListener("favouritesUpdated", onFavUpdated);

    return () => window.removeEventListener("favouritesUpdated", onFavUpdated);
  }, [getToken]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6 text-slate-700">
      <h2 className="text-xl font-semibold mb-2">Your Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {favourites.map((restaurant) => (
            <li key={restaurant._id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}