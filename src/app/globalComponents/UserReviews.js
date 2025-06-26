"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { ApiClient } from "../../../apiClient/apiClient";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserAndReviews = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setError("Not authenticated");
          return;
        }

        //  Send token + headers 
        const syncRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/clerk/sync`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), 
          }
        );

        if (!syncRes.ok) {
          throw new Error("Failed to sync user");
        }

        const dbUser = await syncRes.json();

        const apiClient = new ApiClient(token);
        const reviews = await apiClient.getReviewsByUserId(dbUser._id);

        setUserId(dbUser._id);
        setReviews(reviews);
      } catch (err) {
        console.error("Failed to fetch user reviews:", err);
        setError("Error fetching reviews.");
      }
    };

    fetchUserAndReviews();
  }, [getToken]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6 text-slate-700">
      <h2 className="text-xl font-semibold mb-2">Your Reviews</h2>
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
