'use client';
import React, { useState } from 'react';
import CloudinaryUploader from "../globalComponents/CloudinaryUploader";

export default function CreateRestaurant() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        postcode: '',
        city: '',
        country: '',
        telephone: '',
        website: '',
        category: '',
        meals: '',
        dietary: '',
        alcohol: '',
        welcomes: '',
        facilities: '',
        tags: '',
        description: '',
        imageUrl: '',
        googleMapsUrl: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [textarea, setTextarea] = useState(" ");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = () => {

    };

  //    handleCheckboxChange = changeEvent => {
  //   const { name } = changeEvent.target;

  //   this.setState(prevState => ({
  //     checkboxes: {
  //       ...prevState.checkboxes,
  //       [name]: !prevState.checkboxes[name]
  //     }
  //   }));
  // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === '') {
            setErrorMessage('Please enter a name before submitting.');
            setSuccessMessage('');
            return;
        }

        if (formData.address === '') {
            setErrorMessage('Please enter an address before submitting.');
            setSuccessMessage('');
            return;
        }

        if (formData.city === '') {
            setErrorMessage('Please enter a city before submitting.');
            setSuccessMessage('');
            return;
        }

        if (formData.country === '') {
            setErrorMessage('Please enter a country before submitting.');
            setSuccessMessage('');
            return;
        }

        if (formData.category === '') {
            setErrorMessage('Please select a category before submitting.');
            setSuccessMessage('');
            return;
        }

        if (formData.meals === '') {
            setErrorMessage('Please select meals before submitting.');
            setSuccessMessage('');
            return;
        }

        console.log(formData);
        setErrorMessage('');
        setSuccessMessage('Establishment page submitted!')
    };

    return  (
        <div className="max-w-4xl mx-auto mt-24 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-10 text-center">Create establishment page</h2>

      {/* <h3 className="block mb-1 font-bold text-xl mb-2">Details</h3> */}

      <form onSubmit={handleSubmit} className="space-y-4  pl-20">
        {/* Name */}
        <div>
            <label className="block mb-1 text-lg">Name<span className="text-red-500">*</span></label>
            <input 
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Address */}
        <div>
            <label className="block mb-1 text-lg">Address<span className="text-red-500">*</span></label>
            <input 
            type="text"
            name="address"
            required
            value={formData.username}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Postcode */}
        <div>
            <label className="block mb-1 text-lg">Postcode</label>
            <input 
            type="postcode"
            name="postcode"
            required
            value={formData.postcode}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* City */}
        <div>
            <label className="block mb-1 text-lg">City<span className="text-red-500">*</span></label>
            <input 
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Country */}
        <div>
            <label className="block mb-1 text-lg">Country<span className="text-red-500">*</span></label>
            <input 
            type="text"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Telephone */}
        <div>
            <label className="block mb-1 text-lg">Telephone no.</label>
            <input 
            type="number"
            name="telephone"
            required
            value={formData.number}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Website */}
        <div>
            <label className="block mb-1 text-lg">Website</label>
            <input 
            type="text"
            name="website"
            required
            value={formData.website}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Tags */}
        {/* FREETYPE */}
        <div>
            <label className="block mb-1 text-lg">Additional tags</label>
            <input 
            type="text"
            name="tags"
            required
            value={formData.tags}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Description */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 text-lg">Description</label>
            <textarea 
            type="text"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            />
            {/* <form>
      <textarea value={textarea} onChange={handleChange} /> */}
    </div>


        {/* Image- Cloudinary URL */}
        <label className="block mb-1 text-lg">Images</label>
        <CloudinaryUploader />

        {/* Google Maps URL */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 text-lg">Google Maps URL</label>
            <input 
            type="text"
            name="googleMapsUrl"
            required
            value={formData.googleMapsUrl}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Category */}
        {/* Change to checkbox? */}
        <div>
            <label className="block mb-1 text-lg">Category<span className="text-red-500">*</span></label>
            <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-md px-4 py-2 border rounded"
            >
                <option value="">Select a category</option>
                <option value="cafe">Café</option>
                <option value="bar">Bar</option>
                <option value="restaurant">Restaurant</option>
                <option value="gastropub">Gastro Pub</option>
                <option value="takeaway">Takeaway</option>
            </select>
        </div>

        {/* Meals */}
        {/* CHECKBOX */}
        <div>
            <label className="block mb-1 text-lg">Meals<span className="text-red-500">*</span></label>
        {["Breakfast", "Brunch", "Lunch", "Dinner"].map((val) => (
          <label key={val} className="block text-medium">
            <input
              type="checkbox"
              // value={formData.meals}
              onChange={() => handleCheckboxChange("meals", val)}
              checked={formData.meals.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>

        {/* Dietary */}
        {/* CHECKBOX */}
        <div>
            <label className="block mb-1 text-lg">Dietary restrictions</label>
        {["Vegetarian", "Vegan", "Gluten free", "Dairy free", "Halal", "Kosher"].map((val) => (
          <label key={val} className="block text-medium">
            <input
              type="checkbox"
              // value={formData.dietary}
              onChange={() => handleCheckboxChange("dietary", val)}
              checked={formData.dietary.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>

        {/* Alcohol */}
        <div>
            <label className="block mb-1 text-lg">Does your establishment serve alcohol?</label>
            <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="w-md px-4 py-2 border rounded"
            >
                <option value="">Select an answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>

        {/* Welcomes */}
        {/* CHECKBOX */}
        <div>
            <label className="block mb-1 text-lg">Welcomes</label>
        {["Dogs", "Children"].map((val) => (
          <label key={val} className="block text-medium">
            <input
              type="checkbox"
              // value={formData.welcomes}
              onChange={() => handleCheckboxChange("welcomes", val)}
              checked={formData.welcomes.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>

        {/* Facilities */}
        {/* CHECKBOX */}
        <div>
            <label className="block mb-1 text-lg">Available facilities</label>
        {["Toilets", "Free Wi-Fi"].map((val) => (
          <label key={val} className="block text-medium">
            <input
              type="checkbox"
              // value={formData.facilities}
              onChange={() => handleCheckboxChange("facilities", val)}
              checked={formData.facilities.includes(val)}
            />{" "}
            {val}
          </label>
        ))}
      </div>


      
        {/* Submit Button */}
        <div>
          <button 
           type="submit"
           className="w-20 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
           >
            Submit
           </button>

      <p className="text-sm"><span className="text-red-500">*</span> Required field</p>
      </div>
      </form>


      </div>
    )
}