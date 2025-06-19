"use client";
import { useEffect, useState } from "react";
import SearchFilter from "../globalComponents/SearchFilter";
import RestaurantCard from "../globalComponents/RestaurantCard";
import { ApiClient } from '../../../apiClient/apiClient';
import { buildSearchParams } from "../../utils/buildSearchParams";
import { useSearchParams } from 'next/navigation';

export default function BrowsePage() {
  const [restaurants, setRestaurants] = useState([]);
  const searchParams = useSearchParams();

  const fetchCoordinates = async (city) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lng: data[0].lon,
      };
    }
    return null;
  };

  const fetchUserLocation = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => reject(err)
      )
    );

  const handleFilterChange = async (newFilters) => {
    let location = null;

    if (newFilters.useCurrentLocation) {
      location = await fetchUserLocation();
    } else if (newFilters.city) {
      location = await fetchCoordinates(newFilters.city);
    }

    const query = buildSearchParams(newFilters, location);
    const apiClient = new ApiClient();
    const response = await apiClient.getRestaurants(query);
    setRestaurants(response);
  };

  // Auto-trigger on first load if ?city=London found
  useEffect(() => {
    const cityFromQuery = searchParams.get("city");
    if (cityFromQuery) {
      handleFilterChange({ city: cityFromQuery });
    }
  }, [searchParams]);

  return (
    <div className="flex bg-[rgb(193,233,239)] h-screen">
      <SearchFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-3 gap-4 p-4 flex-grow">
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          restaurants.map((r) => <RestaurantCard key={r._id} restaurant={r} />)
        )}
      </div>
    </div>
  );
}
