'use client';
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CompleteProfile() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

   // If user already has a role, redirect immediately
   useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role) {
      router.replace('/');
    }
  }, [user, isSignedIn, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = await getToken();

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/clerk/sync`, {
        role: selectedRole,
        setupComplete: true,
      },
      {
        headers: { Authorization: `Bearer ${token}`},
      });

      await user.reload(); // to force refresh the Clerk user object
      setSuccessMsg("Profile completed. Redirecting...");
      setTimeout(() => router.replace("/"), 2000); 
    } catch (err) {
      console.error("Error submitting role:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


return (
  <div className="h-screen bg-cover bg-center bg-no-repeat bg-object-bottom"
           style={{ backgroundImage: "url('/images/backdrop.jpg')" }}>
      <div className="max-w-xl mx-auto mt-24 bg-white p-6 rounded-lg shadow-lg text-slate-700">
    <h2 className="text-xl font-bold mb-4">One more step to complete your profile...</h2>
    
    <form onSubmit={handleSubmit} className="my-4">
      <label className="block mb-2">Please choose your role:</label>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full border rounded-md pr-10 pl-3 py-3 mb-5"
        required
      >
        <option value="">Select a role</option>
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full transition bg-gradient-to-b from-amber-500 to-amber-600 px-6 h-10 flex items-center font-semibold text-white hover:cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>

    {isSubmitting && (
  <div className="fixed inset-0 bg-[rgb(193,233,239) bg-opacity-50 flex items-center justify-center z-50">
    <div className="text-xl font-medium">Finishing setup...</div>
  </div>
    )}

    {errorMsg && (
        <p className="text-amber-700 mt-6">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-green-700 mt-6">{successMsg}</p>
      )}

    </div>
  </div>
);
}
