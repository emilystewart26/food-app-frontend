"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("/api/reviews/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setReviews(res.data.reviews))
    .catch((err) => console.error("Failed to fetch reviews", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      {reviews.length === 0 ? (
        <p>You haven’t left any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border-b py-2">
            <p><strong>Restaurant:</strong> {review.restaurantId?.name}</p>
            <p>🍽️ Food: {review.foodStars}★ – {review.foodReview}</p>
            <p>🎶 Ambience: {review.ambienceStars}★ – {review.ambienceReview}</p>
            <p>🧑‍🍳 Service: {review.serviceStars}★ – {review.serviceReview}</p>
            <p>📍 Location: {review.locationStars}★ – {review.locationReview}</p>
          </div>
        ))
      )}
    </div>
  );
}
