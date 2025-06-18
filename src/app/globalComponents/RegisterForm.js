'use client';
import React, { useState } from 'react';
import { SignUpButton } from "@clerk/nextjs";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
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

    // ======== BACKEND SUBMISSION PLACEHOLDER ========
    /*
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMessage('Registration successful!');
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'Something went wrong.');
          setSuccessMessage('');
        }
      })
      .catch(err => {
        setErrorMessage('Failed to register. Please try again.');
        setSuccessMessage('');
      });
    */
    // ===============================================

    console.log(formData);
    setErrorMessage('');
    setSuccessMessage('Registration submitted!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          </select>
        </div>
        <div>
        {/* Username */}
        <div>
          <label className="block my-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="••••••••"
            required={true}
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block my-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="••••••••"
            required={true}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block my-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            name="password"
            required={true}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters and include a number, a capital letter, and a symbol.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block my-1 font-medium">Retype Password</label>
          <input
            type="password"
            placeholder="••••••••"
            name="confirmPassword"
            required={true}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
       {/* ======================== */}
        <div className="text-center mt-6">
        <p className="text-gray-500 mb-2">or</p>

        <SignUpButton mode="modal" redirecturl="/dashboard">
          <button className="w-full bg-blue-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Continue with Google
          </button>
        </SignUpButton>
      </div>
      {/* ======================== */}
      </div>
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
