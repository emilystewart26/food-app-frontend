import { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantReviews({ restaurantId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://food-app-backend-xhqh.onrender.com/api/reviews/restaurantid/${restaurantId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, [restaurantId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-4 rounded bg-gray-50">
              <p className="italic">"{review.content}"</p>
              <p className="text-sm text-gray-600">— {review.userId?.name || "Anonymous"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
