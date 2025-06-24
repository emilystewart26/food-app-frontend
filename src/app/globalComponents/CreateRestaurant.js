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
        <div className="max-w-4xl mx-auto mt-24 bg-white p-6 rounded-lg shadow-lg text-slate-700">
      <h2 className="text-2xl font-bold mb-10 text-center text-slate-700">Add establishment</h2>
      <p className="mb-5 text-right pr-34 text-slate-700"><span className="text-red-500">*</span>indicates a required field</p>

      {/* <h3 className="block mb-1 font-bold text-xl mb-2">Details</h3> */}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 justify-items-center space-y-6">
        {/* Name */}
        <div>
            <label className="block mb-1 text-lg">Name<span className="text-red-500">*</span></label>
            <input 
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
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
            className="py-2 px-4 w-xl border rounded"
            />
        </div>

        {/* Tags */}
        {/* FREETYPE */}
        <div>
            <label className="block mb-1 text-lg">Additional tags</label>
            <input 
            type="text"
            name="tags"
            placeholder="Eg. italian, coffee, cosy"
            required
            value={formData.tags}
            onChange={handleChange}
            className="py-2 px-4 w-xl border rounded"
            />
        </div>

        {/* Description */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 text-lg">Description</label>
            <textarea 
            type="text"
            name="description"
            placeholder="Describe your establishment..."
            required
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 w-xl border rounded"
            />
            {/* <form>
      <textarea value={textarea} onChange={handleChange} /> */}
    </div>


        {/* Image- Cloudinary URL */}
        <div className="w-xl">
          <label className="block mb-1 text-lg">Photos<span className="ml-5 text-sm">(Max. 10 photos)</span></label>
          <CloudinaryUploader />
        </div>

        {/* Google Maps URL */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 text-lg">Google Maps URL</label>
            <input 
            type="text"
            name="googleMapsUrl"
            placeholder="https://maps.app.goo.gl/..."
            required
            value={formData.googleMapsUrl}
            onChange={handleChange}
            className="py-2 px-4 w-xl border rounded"
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
            className="w-xl px-4 py-2 border rounded"
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
        <div className="w-xl">
            <label className="block mb-1 text-lg text-left">Please select which meals your establishment serves:<span className="text-red-500">*</span></label>
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
        <div className="w-xl">
            <label className="block mb-1 text-lg">Does your establishment cater to any dietary restrictions?</label>
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
        <div className="w-xl">
            <label className="block mb-1 text-lg">Does your establishment serve alcohol?</label>
            <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            className="w-xl px-4 py-2 border rounded"
            >
                <option value="">Select an answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>

        {/* Welcomes */}
        {/* CHECKBOX */}
        <div className="w-xl">
            <label className="block mb-1 text-lg">Does your establishment welcome dogs and children?</label>
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
        <div className="w-xl">
            <label className="block mb-1 text-lg">Does your establishment have the following facilities available?</label>
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
           className="text-xl rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 hover:cursor-pointer px-8 h-12 flex items-center justify-center overflow-hidden font-semibold text-white"
           >
            Submit
           </button>
      </div>
      </form>


      </div>
    )
}