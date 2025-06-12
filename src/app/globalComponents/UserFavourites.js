"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UserFavourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/api/favourites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setFavourites(res.data.favourites))
      .catch((err) => console.error("Failed to fetch favourites", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
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
