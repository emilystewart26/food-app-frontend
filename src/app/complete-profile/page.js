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
      <div className="flex flex-col items-center mt-10 min-h-screen px-4">
    <h2 className="text-xl font-bold mb-4">Complete your profile</h2>
    
    <form onSubmit={handleSubmit}>
      <label className="block mb-2">Choose your role:</label>
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="w-full border rounded-md pr-10 py-2 mb-5 bg-slate-500 text-white"
        required
      >
        <option value="">Select a role</option>
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-amber-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>

    {isSubmitting && (
  <div className="fixed inset-0 bg-[rgb(193,233,239) bg-opacity-60 flex items-center justify-center z-50">
    <div className="text-xl font-medium">Finishing setup...</div>
  </div>
    )}

    {errorMsg && (
        <p className="text-red-500 mt-4">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-green-600 mt-4">{successMsg}</p>
      )}

    </div>
  </div>
);
}
