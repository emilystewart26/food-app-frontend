"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios.get("http://localhost:3001/api/user/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setWishlist(res.data.wishlist))
    .catch((err) => console.error("Failed to fetch wishlist", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No places added yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {wishlist.map((place) => (
            <li key={place._id}>{place.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
