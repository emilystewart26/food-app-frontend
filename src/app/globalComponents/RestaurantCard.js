import React from 'react';
import Link from 'next/link';

export default function RestaurantCard({ restaurant }) {

  const distanceKm = restaurant.distance / 1000;
  const distanceKmRounded = Math.round(distanceKm * 10) / 10;
  const distanceAvailable = typeof restaurant.distance === "number" && !Number.isNaN(distanceKmRounded);

  const fallbackImages = ["https://res.cloudinary.com/dx9lz1em1/image/upload/v1750778164/bohoe0ehigjbfrt5twxq.jpg", "https://res.cloudinary.com/dx9lz1em1/image/upload/v1750778158/kk6tlpiirvkaxnx1eph3.jpg"];
  const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  const imageUrl = Array.isArray(restaurant.imageUrl) && restaurant.imageUrl.length > 0 ? restaurant.imageUrl[0] : randomFallback;

  return (
    <a href={`/eatery/${restaurant._id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full max-w-md rounded-2xl shadow-md p-4 border bg-white">
        {/* Name of Restaurant*/}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          {restaurant.name}
        </h2>

        {/* Photo */}
        <img
          //className ={} 
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
        {/* Address */}
        <p className="text-sm text-gray-800 font-semibold">Address: <span className="text-gray-600 font-normal">{restaurant.address}, {restaurant.city} {restaurant.postcode}</span></p>
        {distanceAvailable && (
          <p className="text-sm text-gray-800 font-semibold"> {distanceKmRounded} km away </p>
        )}
      </div>
    </a>
  );
};




