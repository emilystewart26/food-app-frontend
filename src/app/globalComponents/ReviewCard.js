"use client";
import React, { useEffect, useState } from "react";

export default function ReviewCard() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("You must be logged in to view your reviews.");
          return;
        }

        const res = await fetch(`http://localhost:5000/api/reviews/userid/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch reviews");
        }

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserReviews();
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Your Reviews</h2>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 && !error && (
        <p className="text-gray-500">You haven’t submitted any reviews yet.</p>
      )}

      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 mb-4">
          <p className="font-semibold">Restaurant: {review.restaurantId}</p>
          <p>Food: {review.foodReview} ({review.foodStars}★)</p>
          <p>Ambience: {review.ambienceReview} ({review.ambienceStars}★)</p>
          <p>Service: {review.serviceReview} ({review.serviceStars}★)</p>
          <p>Location: {review.locationReview} ({review.locationStars}★)</p>
        </div>
      ))}
    </div>
  );
}
