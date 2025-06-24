"use client";
import { useEffect, useState } from "react";
import SearchFilter from "../globalComponents/SearchFilter";
import RestaurantCard from "../globalComponents/RestaurantCard";
import { ApiClient } from '../../../apiClient/apiClient';
import { buildSearchParams } from "../../utils/buildSearchParams";
import { useSearchParams } from 'next/navigation';

export default function BrowsePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentCity, setCurrentCity] = useState(""); // State to store the current city
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
  
      // Use current city if no new city is specified
      const city = newFilters.city || currentCity;
  
      if (newFilters.useCurrentLocation) {
        location = await fetchUserLocation();
      } else if (city) {
        location = await fetchCoordinates(city);
      }
  
      // Update current city if a new city is specified
      if (newFilters.city) {
        setCurrentCity(newFilters.city);
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
    setCurrentCity(cityFromQuery); // Set the initial city
    handleFilterChange({ city: cityFromQuery });
  }
}, [searchParams]);

  return (
    <div className="flex bg-[rgb(193,233,239)] h-screen my-6">
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