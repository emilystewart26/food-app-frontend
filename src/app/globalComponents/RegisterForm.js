'use client';
import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate role
    if (formData.role === '') {
      setErrorMessage('Please select a role before submitting.');
      setSuccessMessage('');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage('Password must be at least 8 characters and include a number, a capital letter, and a symbol.');
      setSuccessMessage('');
      return;
    }

    // Simulated form submission
    console.log(formData);

    setErrorMessage('');
    setSuccessMessage('Registration submitted!');
  };

  return (
    <div className="max-w-md mx-auto mt-44 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-sm text-gray-600 mt-1">
            Password must be at least 8 characters and include a number, a capital letter, and a symbol.
          </p>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          {errorMessage}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
}
