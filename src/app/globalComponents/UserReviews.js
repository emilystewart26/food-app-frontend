"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserAndReviews = async () => {
      try {
        const token = await getToken();
        if (!token) return setError("User not authenticated.");

        //  Sync with backend to get MongoDB user ID
        const syncRes = await axios.post(
          "http://localhost:3001/api/users/clerk/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const dbUserId = syncRes.data._id;
        setUserId(dbUserId);

        //  fetch reviews by userId
        const reviewsRes = await axios.get(
          `http://localhost:3001/api/reviews/userid/${dbUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Failed to fetch user reviews:", err);
        setError("Error fetching reviews.");
      }
    };

    fetchUserAndReviews();
  }, [getToken]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      {error && <p className="text-red-500">{error}</p>}
      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {reviews.map((review) => (
            <li key={review._id}>
              <strong>{review.restaurantId?.name || "Unknown Restaurant"}:</strong>{" "}
              {review.foodReview}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
