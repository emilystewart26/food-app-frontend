import { useState } from "react";

const initialFilterState = {
  category: [],
  meals: [],
  dietary: [],
  city: "",
  useCurrentLocation: false,
  radius: "5000", 
};

export default function SearchFilter({ onFilterChange }) {
  const [filters, setFilters] = useState(initialFilterState);

  const handleCheckboxChange = (group, value) => {
    const groupValues = filters[group];
    const newValues = groupValues.includes(value)
      ? groupValues.filter((v) => v !== value)
      : [...groupValues, value];

    const updatedFilters = { ...filters, [group]: newValues };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-4  w-64 space-y-4 bg-white/50">
      <div>
      <div>
        <p className="mb-1">Search by City</p>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleInputChange}
          disabled={filters.useCurrentLocation}
          className="w-full border px-2 py-1 rounded"
          placeholder="City..."
        />
        <label className="block mt-1 text-sm">
          <input
            type="checkbox"
            name="useCurrentLocation"
            checked={filters.useCurrentLocation}
            onChange={handleInputChange}
          />{" "}
          Use current location
        </label>
      </div>

      <div>
        <p className="text-sm mt-1">Search within</p>
        <select
          name="radius"
          value={filters.radius}
          onChange={handleInputChange}
          className="w-full border px-2 py-1 rounded"
        >
          <option className="text-sm" value="1000">1 km</option>
          <option className="text-sm" value="3000">3 km</option>
          <option className="text-sm" value="5000">5 km</option>
        </select>
      </div>
        <p className="mt-4 mb-1">Type</p>
        {["cafe", "bar", "restaurant","gastropub","takeaway"].map((val) => (
          <label key={val} className="block text-sm">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("category", val)}
              checked={filters.category.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>

      <div>
        <p className="mb-1">Meals</p>
        {["breakfast", "brunch", "lunch", "dinner"].map((val) => (
          <label key={val} className="block text-sm">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("meals", val)}
              checked={filters.meals.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>

      <div>
        <p className="mb-1">Dietary Requirements</p>
        {["vegetarian", "vegan", "glutenfree", "dairyfree", "halal", "kosher"].map((val) => (
          <label key={val} className="block text-sm">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("dietary", val)}
              checked={filters.dietary.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>
    </div>
  );
}