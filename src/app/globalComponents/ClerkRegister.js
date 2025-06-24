'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';


export default function ClerkRegister() {
  
  return (
    <div className="flex flex-col items-center mt-10 min-h-screen px-4">
      {/* Role selector >> now deleted */}
      
        <SignUp
          path="/register"
          afterSignInUrl="/" //// deprecated - NEED TO FIND OUT HOW TO REPLACE !!!
          signInUrl="/login"
          appearance={{
            elements: {
              card: "shadow-xl rounded-xl px-4 py-6",
            },
          }}
          signUpFields={[
            {
              name: 'username',
              label: 'Username',
              placeholder: 'e.g. coolrabbit',
              type: 'text',
            },
            {
              name: 'email_address',
              label: 'Email',
              type: 'email',
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Min 8 chars, 1 cap, 1 number, 1 symbol',
            },
          ]}
        />
      
    </div>
  );
}

/**
 * <div className="mb-6 w-full max-w-sm">
        <label className="block text-sm font-medium mb-1 ml-1">Registering as:</label>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-full border rounded-md px-4 py-2 bg-slate-500 text-white"
        >
          <option value="">Select a role</option>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>

      {selectedRole ? (
 * 
 * 
 * 
 * 
 * 
 * 
 * ) : (
        <p className="text-red-600 text-sm">Please select a role to proceed with registration</p>
      )}
 * 
 * 
 * 
 */