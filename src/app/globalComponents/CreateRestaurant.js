'use client';
import React, { useState } from 'react';
import CloudinaryUploader from "../globalComponents/CloudinaryUploader";
// import { Checkbox } from './Checkbox';

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Checkbox function???

//     function handleInputChange(e) {
//     if (e.target.type == 'checkbox') {
//       if (e.target.checked) {
//         setData({
//           ...data, [e.target.name]: true
//         })
//       } else {
//         setData({
//           ...data, [e.target.name]: false
//         })
//       }
//     } else {
//       setData({ ...data, [e.target.name]: e.target.value })
//     }
//   }

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

    //py-10 px-4

    return  (
        <div className="max-w-4xl mx-auto mt-24 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-10 text-center">Create establishment page</h2>

      {/* <h3 className="block mb-1 font-bold text-xl mb-2">Details</h3> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
            <label className="block mb-1 font-medium">Name</label>
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
            <label className="block mb-1 font-medium">Address</label>
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
            <label className="block mb-1 font-medium">Postcode</label>
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
            <label className="block mb-1 font-medium">City</label>
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
            <label className="block mb-1 font-medium">Country</label>
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
            <label className="block mb-1 font-medium">Telephone No.</label>
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
            <label className="block mb-1 font-medium">Website</label>
            <input 
            type="text"
            name="website"
            required
            value={formData.website}
            onChange={handleChange}
            className="py-2 px-4 w-md border rounded"
            />
        </div>

        {/* Category */}
        {/* Change to checkbox? */}
        <div>
            <label className="block mb-1 font-medium">Category</label>
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

        {/* Dietary */}
        {/* CHECKBOX */}

        {/* Alcohol */}
        <div>
            <label className="block mb-1 font-medium">Does your establishment serve alcohol?</label>
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

        {/* Facilities */}
        {/* CHECKBOX */}

        {/* Tags */}
        {/* FREETYPE */}

        {/* Description */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 font-medium">Description</label>
            <input 
            type="text"
            name="website"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            />
        </div>

        {/* Image- Cloudinary URL */}
        <label className="block mb-1 font-medium">Images</label>
        <CloudinaryUploader />

        {/* Google Maps URL */}
        {/* TEXTBOX */}
        <div>
            <label className="block mb-1 font-medium">Google Maps URL</label>
            <input 
            type="text"
            name="website"
            required
            value={formData.googleMapsUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            />
        </div>

        {/* Submit Button */}
        <button 
           type="submit"
           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
           >
            Submit
           </button>
      </form>

      </div>
    )
}