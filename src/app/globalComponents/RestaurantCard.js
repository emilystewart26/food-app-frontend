import React from 'react';

const RestaurantCard = ({ name, photoUrl, isOpen, distance }) => {
  return (
    <div className="w-full max-w-md rounded-2xl shadow-md p-4 border bg-white">
      {/* Name of Restaurant*/}
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {name}
      </h2>

      {/* Photo */}
      <img
        src={photoUrl}
        alt={`${name} photo`}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />

      {/* Open status and distance */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className={isOpen ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
          {isOpen ? "Open Now" : "Closed"}
        </span>
        <span>{distance} km away</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
