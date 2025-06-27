"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@clerk/nextjs";
import { ApiClient } from "../../../../../apiClient/apiClient";

const ReactStars = dynamic(() => import("react-stars"), { ssr: false });


export default function ReviewPage() {
  const { id } = useParams(); // Restaurant ID from the route
  const { getToken } = useAuth(); 
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
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    if (id) {
      setFormData((prev) => ({ ...prev, restaurantId: id }));
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setError("");
  setSuccess("");

  try {
    const token = await getToken();
    const apiClient = new ApiClient(token);

    await apiClient.addReview({
      ...formData,
      restaurantId: id,
    });

      setSuccess("Review submitted!");
      setTimeout(() => {
        router.push(`/eatery/${id}`);
      }, 3000);
    } catch (err) {
      console.error("Review submission failed:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6 bg-white p-6 shadow-md rounded-xl mt-10 mb-10 text-slate-700">
      <h1 className="text-2xl font-bold text-center">Leave a Review</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-xl"
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

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="hover:cursor-pointer rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 active:from-yellow-400 px-8 h-12 items-center overflow-hidden font-semibold text-white"
          >
            Submit Review
          </button>
        </div>

         {/* Feedback Messages */}
         {success && 
         <p className="text-green-600">{success}</p>
         }
         { error && 
         <p className="text-red-600">{error}</p>
         }

      </form>
    </div>
  );
}
