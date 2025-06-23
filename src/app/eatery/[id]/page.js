"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ApiClient} from "../../../../apiClient/apiClient";
const apiClient = new ApiClient();

import RestaurantDetails from "../../globalComponents/RestaurantDetails";
import RestaurantMap from "../../globalComponents/RestaurantMap";
import AddToFavourites from "../../globalComponents/AddToFavourites";
import RestaurantDescription from "../../globalComponents/RestaurantDescription";
import RestaurantReviews from "../../globalComponents/RestaurantReviews";

export default function EateryPage() {
  const { id } = useParams();
  console.log(id);
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const data = await apiClient.getRestaurantById(id);
        console.log(data)
        setRestaurant(data);
      } catch (err) {
        console.error("Error loading restaurant", err);
        setError("Failed to load restaurant details.");
      }
    }

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center px-4">
        <div className="p-6 max-w-4xl w-full bg-white rounded shadow">
          <RestaurantDetails restaurant={restaurant} />
          <div className="flex gap-4 my-4">
            <AddToFavourites restaurantId={id} />
          </div>
          <RestaurantMap mapUrl={restaurant.googleMapsUrl} />
          <RestaurantDescription description={restaurant.description} />
          <RestaurantReviews restaurantId={id} />

          {/* Leave Review Button */}
          <div className="mt-6">
            <Link href={`/restaurants/${id}/review`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                Leave a Review
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
