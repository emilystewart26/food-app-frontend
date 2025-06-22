'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';


export default function ClerkRegister() {
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (selectedRole) {
      localStorage.setItem('selectedRole', selectedRole);
    }
  }, [selectedRole]);

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen px-4">
      {/* Role selector */}
      <div className="mb-6 w-full max-w-sm">
        <label className="block text-sm font-medium mb-1 ml-1">Registering as:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full border rounded-md px-4 py-2 bg-slate-500 text-white"
        >
          <option value="">Select a role</option>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>

      {selectedRole ? (
        <SignUp
          path="/register"
          redirectUrl="/post-auth" //// deprecated - NEED TO FIND OUT HOW TO REPLACE !!!
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
            // Note: Clerk doesn't support confirm password  >> I have left this out
          ]}
        />
      ) : (
        <p className="text-red-600 text-sm">Please select a role to proceed with registration</p>
      )}
    </div>
  );
}
