import React from 'react';
import RestaurantCard from './globalComponents/RestaurantCard';

export default function Home() {
  // Sample data for 6 restaurants
  const sampleRestaurants = [
    {
      name: 'La Petite Cuisine',
      photoUrl: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isOpen: true,
      distance: 1.2,
    },
    {
      name: 'Sakura Sushi',
      photoUrl: 'https://images.unsplash.com/photo-1642479513653-1b5a1664df8d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isOpen: false,
      distance: 3.5,
    },
    {
      name: 'The Vegan Spot',
      photoUrl: 'https://images.unsplash.com/photo-1631311695255-8dde6bf96cb5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFZlZ2FuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D',
      isOpen: true,
      distance: 0.9,
    },
    {
      name: 'Taco Fiesta',
      photoUrl: 'https://images.unsplash.com/photo-1627564803215-ad55bad5c5ea?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGFjb3xlbnwwfHwwfHx8MA%3D%3D',
      isOpen: true,
      distance: 2.1,
    },
    {
      name: 'Burger Barn',
      photoUrl: 'https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEJ1cmdlciUyMEJhcm58ZW58MHx8MHx8fDA%3D',
      isOpen: false,
      distance: 4.3,
    },
    {
      name: 'Café Milano',
      photoUrl: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fENhZiVDMyVBOXxlbnwwfHwwfHx8MA%3D%3D',
      isOpen: true,
      distance: 1.7,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-36">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sampleRestaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            name={restaurant.name}
            photoUrl={restaurant.photoUrl}
            isOpen={restaurant.isOpen}
            distance={restaurant.distance}
          />
        ))}
      </div>
    </main>
  );
}
