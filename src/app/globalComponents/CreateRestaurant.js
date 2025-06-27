'use client';
import React, { useState } from 'react';
import CloudinaryUploader from "../globalComponents/CloudinaryUploader";
import { useAuth } from "@clerk/nextjs";
import { ApiClient } from '../../../apiClient/apiClient';
import { useRouter } from "next/navigation";
import { Cloudinary } from "@cloudinary/url-gen";


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
        alcohol: '',
        checkboxes: {
          meals: [],
          dietary: [],
          welcomes: [],
          facilities: [],
        },
        tags: '',
        description: '',
        imageUrl: '',
        googleMapsUrl: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [textarea, setTextarea] = useState(" ");
    const { getToken } = useAuth();
    const router = useRouter();
    //const cld = new Cloudinary({ cloud: { cloudName: process.env.dx9lz1em1 } }); ---> TODO !!!


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (category, value) => {
  setFormData((prevFormData) => {
    const currentValues = prevFormData.checkboxes[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    return {
      ...prevFormData,
      checkboxes: {
        ...prevFormData.checkboxes,
        [category]: newValues,
      },
    };
  });
};


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.address || !formData.city || !formData.country || !formData.category) {
          setErrorMessage("Please fill out all required fields.");
          setSuccessMessage("");
          return;
        }
        console.log(formData);
        setIsSubmitting(true);
        try {
          const token = await getToken(); // get Clerk JWT
          const apiClient = new ApiClient(token);
      
          const newRestaurant = await apiClient.addRestaurant({
            ...formData,
            category: [formData.category], // backend expects array
            meals: formData.checkboxes.meals,
            dietary: formData.checkboxes.dietary,
            welcomes: formData.checkboxes.welcomes,
            facilities: formData.checkboxes.facilities,
            alcohol: formData.alcohol === "yes", // convert to boolean
            tags: formData.tags?.split(",").map(tag => tag.trim()), // optional formatting
          });
      
          console.log("Successfully added restaurant:", newRestaurant);
          setSuccessMessage("Establishment submitted! Redirecting...");
          setErrorMessage("");
          setFormDisabled(true);

          setTimeout(() => {
            router.push(`/eatery/${newRestaurant._id}`);
          }, 3000);
          
        } catch (error) {
          console.error("Submission error:", error);
          setErrorMessage("Failed to submit establishment.");
          setSuccessMessage("");
        }
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
            value={formData.address}
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
            type="string"
            name="telephone"
            required={false}
            value={formData.telephone}
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
            required={false}
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
            required={false}
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
            required={false}
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
            required={false}
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
  <label className="block mb-1 text-lg text-left">
    Please select which meals your establishment serves:
    <span className="text-red-500">*</span>
  </label>
  {["breakfast", "brunch", "lunch", "dinner"].map((val) => (
    <label key={val} className="block text-medium">
      <input
        type="checkbox"
        onChange={() => handleCheckboxChange("meals", val)}
        checked={formData.checkboxes.meals.includes(val)}
      />{" "}
      {val.charAt(0).toUpperCase() + val.slice(1)}
    </label>
  ))}
</div>



<div className="w-xl">
  <label className="block mb-1 text-lg">Does your establishment cater to any dietary restrictions?</label>
  {["vegetarian", "vegan", "glutenfree", "dairyfree", "halal", "kosher"].map((val) => (
    <label key={val} className="block text-medium">
      <input
        type="checkbox"
        onChange={() => handleCheckboxChange("dietary", val)}
        checked={formData.checkboxes.dietary.includes(val)}
      />{" "}
      {val.charAt(0).toUpperCase() + val.slice(1)}
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

<div className="w-xl">
  <label className="block mb-1 text-lg">Does your establishment welcome dogs and children?</label>
  {["dogs", "children"].map((val) => (
    <label key={val} className="block text-medium">
      <input
        type="checkbox"
        onChange={() => handleCheckboxChange("welcomes", val)}
        checked={formData.checkboxes.welcomes.includes(val)}
      />{" "}
      {val.charAt(0).toUpperCase() + val.slice(1)}
    </label>
  ))}
</div>


        {/* Facilities */}
        {/* CHECKBOX */}
        <div className="w-xl">
  <label className="block mb-1 text-lg">Does your establishment have the following facilities available?</label>
  {["toilets", "garden", "wifi"].map((val) => (
    <label key={val} className="block text-medium">
      <input
        type="checkbox"
        onChange={() => handleCheckboxChange("facilities", val)}
        checked={formData.checkboxes.facilities.includes(val)}
      />{" "}
      {val.charAt(0).toUpperCase() + val.slice(1)}
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

           {successMessage && (
    <p className="text-green-600 mt-4">{successMessage}</p>
  )}
  {errorMessage && (
    <p className="text-red-600 mt-4">{errorMessage}</p>
  )}
      </div>
      </form>


      </div>
    )
}