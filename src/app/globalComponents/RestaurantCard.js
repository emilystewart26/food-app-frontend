import React from 'react';
import Link from 'next/link';

export default function RestaurantCard({ restaurant }) {

  const distanceKm = restaurant.distance / 1000;
  const distanceKmRounded = Math.round(distanceKm * 10) / 10;
  const distanceAvailable = typeof restaurant.distance === "number" && !Number.isNaN(distanceKmRounded);

  const fallbackImages = ["https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
, "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
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




