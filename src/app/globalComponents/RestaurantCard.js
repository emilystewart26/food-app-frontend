import React from 'react';

export default function RestaurantCard({ restaurant }) {

  const distanceKm = restaurant.distance / 1000;
  const distanceKmRounded = Math.round(distanceKm * 10) / 10;
  const distanceAvailable = typeof restaurant.distance === "number" && !Number.isNaN(distanceKmRounded);

  const defaultImageUrl = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
  const imageUrl = Array.isArray(restaurant.imageUrl) && restaurant.imageUrl.length > 0 ? restaurant.imageUrl[0] : defaultImageUrl;

  return (
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
  );
};




