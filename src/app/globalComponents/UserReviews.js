import { useEffect, useState } from "react";
import axios from "axios";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { 
    const token = localStorage.getItem("authToken"); // this may need to be revised after Clerk implementation
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) {
      setError("User not authenticated.");
      return;
    }

    axios.get(`http://localhost:3001/api/reviews/userid/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setReviews(res.data))
    .catch((err) => {
      console.error("Failed to fetch user reviews:", err);
      setError("Error fetching reviews");
    });
  }, []);

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
              <strong>{review.restaurantId?.name || "Unknown Restaurant"}:</strong> {review.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
