"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });

export default function ReviewPage() {
  const [restaurants, setRestaurants] = useState([]);
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

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("/api/restaurants"); // Update this if needed
      setRestaurants(res.data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `/api/reviews/${formData.restaurantId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted successfully!");
      setFormData({
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
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Leave a Review</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 shadow-md rounded-xl"
      >
        <select
          className="w-full border rounded p-2"
          value={formData.restaurantId}
          onChange={(e) =>
            setFormData({ ...formData, restaurantId: e.target.value })
          }
          required
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>

        {/* Food */}
        <div>
          <label>How was the food?</label>
          <ReactStars
            count={5}
            value={formData.foodStars}
            onChange={(newValue) =>
              setFormData({ ...formData, foodStars: newValue })
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            placeholder="Describe your experience"
            value={formData.foodReview}
            onChange={(e) =>
              setFormData({ ...formData, foodReview: e.target.value })
            }
            required
          />
        </div>

        {/* Ambience */}
        <div>
          <label>How was the ambience?</label>
          <ReactStars
            count={5}
            value={formData.ambienceStars}
            onChange={(newValue) =>
              setFormData({ ...formData, ambienceStars: newValue })
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            placeholder="Describe the ambiance"
            value={formData.ambienceReview}
            onChange={(e) =>
              setFormData({ ...formData, ambienceReview: e.target.value })
            }
            required
          />
        </div>

        {/* Service */}
        <div>
          <label>How was the service?</label>
          <ReactStars
            count={5}
            value={formData.serviceStars}
            onChange={(newValue) =>
              setFormData({ ...formData, serviceStars: newValue })
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            placeholder="Describe the service"
            value={formData.serviceReview}
            onChange={(e) =>
              setFormData({ ...formData, serviceReview: e.target.value })
            }
            required
          />
        </div>

        {/* Location */}
        <div>
          <label>How was the location?</label>
          <ReactStars
            count={5}
            value={formData.locationStars}
            onChange={(newValue) =>
              setFormData({ ...formData, locationStars: newValue })
            }
            size={30}
            color2="#ffd700"
          />
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={3}
            placeholder="Was the location convenient?"
            value={formData.locationReview}
            onChange={(e) =>
              setFormData({ ...formData, locationReview: e.target.value })
            }
            required
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
