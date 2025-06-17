"use client";
import { useEffect, useState } from "react";
import SearchFilter from "../globalComponents/SearchFilter";
import RestaurantCard from "../globalComponents/RestaurantCard";
import { ApiClient } from '../../../apiClient/apiClient';
import { buildSearchParams } from "../../utils/buildSearchParams";

export default function BrowsePage() {
  //const [filters, setFilters] = useState({});
  const [restaurants, setRestaurants] = useState([]);

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
    const response = await  await apiClient.getRestaurants(query);
    setRestaurants(response);
  };

  return (
    <div className="flex">
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
