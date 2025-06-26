"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ApiClient } from "../../../../../apiClient/apiClient";
const apiClient = new ApiClient();

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

export default function ReviewPage() {
  const { id } = useParams(); // Restaurant ID from the route
  const router = useRouter();

  const [formData, setFormData] = useState({
    foodReview: "",
    foodStars: 0,
    ambienceReview: "",
    ambienceStars: 0,
    serviceReview: "",
    serviceStars: 0,
    locationReview: "",
    locationStars: 0,
    restaurantId: "", 
  });

  useEffect(() => {
    if (id) {
      setFormData((prev) => ({ ...prev, restaurantId: id }));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      await apiClient.addReview({ ...formData, restaurantId: id });

      alert("Review submitted!");
      router.push(`/restaurants/${id}`);
    } catch (err) {
      console.error("Review submission failed:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Leave a Review</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 shadow-md rounded-xl"
      >
        {/* Food Section */}
        <div>
          <label>How was the food?</label>
          <ReactStars
            count={5}
            value={formData.foodStars}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, foodStars: value }))
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            required
            placeholder="Describe your experience"
            value={formData.foodReview}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                foodReview: e.target.value,
              }))
            }
          />
        </div>

        {/* ambience, service, location */}
        <div>
          <label>How was the ambience?</label>
          <ReactStars
            count={5}
            value={formData.ambienceStars}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, ambienceStars: value }))
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            required
            placeholder="Describe the ambience"
            value={formData.ambienceReview}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ambienceReview: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label>How was the service?</label>
          <ReactStars
            count={5}
            value={formData.serviceStars}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, serviceStars: value }))
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            required
            placeholder="Describe the service"
            value={formData.serviceReview}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                serviceReview: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label>How was the location?</label>
          <ReactStars
            count={5}
            value={formData.locationStars}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, locationStars: value }))
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            required
            placeholder="Was the location convenient?"
            value={formData.locationReview}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                locationReview: e.target.value,
              }))
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
