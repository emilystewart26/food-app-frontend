'use client';
import { useEffect, useState } from 'react';
import RestaurantCard from '../globalComponents/RestaurantCard';

export default function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    meals: [],
    alcohol: false, 
    dietary: [],
    welcomes: [],
    facilities: [],
    price: [],
    accessibility: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === 'alcohol') {
        return { ...prev, alcohol: value }; // value is true or false
      }

      const current = prev[filterType];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return { ...prev, [filterType]: updated };
    });
  };

  useEffect(() => {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'alcohol') {
        if (value !== null) {
          query.append('alcohol', value); // pass true/false
        }
      } else {
        value.forEach((v) => query.append(key, v));
      }
    });

    const fetchRestaurants = async () => {
      const res = await fetch(`/api/restaurants?${query.toString()}`);
      const data = await res.json();
      setRestaurants(data);
    };

    fetchRestaurants();
  }, [filters]);

  return (
    <main className="min-h-screen bg-blue-100 px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <FilterGroup title="Type of Eatery" type="category" options={["cafe", "bar", "restaurant", "gastropub", "takeaway"]} onChange={handleFilterChange} />
          <FilterGroup title="Meals" type="meals" options={["breakfast", "brunch", "lunch", "dinner"]} onChange={handleFilterChange} />
          <FilterGroup title="Dietary Requirements" type="dietary" options={["vegetarian", "vegan", "glutenfree", "dairyfree", "halal", "kosher"]} onChange={handleFilterChange} />
          <FilterGroup title="Feature Tags" type="welcomes" options={["children", "dogs"]} onChange={handleFilterChange} />
          <FilterGroup title="Facilities" type="facilities" options={["toilets", "garden", "wifi"]} onChange={handleFilterChange} />
          <FilterGroup title="Price" type="price" options={["cheap", "moderate", "expensive"]} onChange={handleFilterChange} />
          <FilterGroup title="Accessibility" type="accessibility" options={["wheelchair", "disabled_bathroom"]} onChange={handleFilterChange} />

          {/* Alcohol Filter (Boolean Radio Buttons) */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Serves Alcohol</h3>
            <label className="block text-sm text-gray-700">
              <input
                type="radio"
                name="alcohol"
                onChange={() => handleFilterChange("alcohol", true)}
                checked={filters.alcohol === true}
                className="mr-2"
              />
              Yes
            </label>
            <label className="block text-sm text-gray-700">
              <input
                type="radio"
                name="alcohol"
                onChange={() => handleFilterChange("alcohol", false)}
                checked={filters.alcohol === false}
                className="mr-2"
              />
              No
            </label>
          </div>
        </aside>

        {/* Restaurant Cards */}
        <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <RestaurantCard
                key={index}
                name={restaurant.name}
                photoUrl={restaurant.imageUrl?.[0] || ''}
                isOpen={true}
                distance={1.2}
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No results found.</p>
          )}
        </section>
      </div>
    </main>
  );
}

function FilterGroup({ title, type, options, onChange }) {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      {options.map((option) => (
        <label key={option} className="block text-sm text-gray-700">
          <input
            type="checkbox"
            onChange={() => onChange(type, option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
}
