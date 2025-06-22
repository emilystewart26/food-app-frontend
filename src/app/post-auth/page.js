'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";


export default function PostAuth() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        const role = localStorage.getItem("selectedRole") || "user";
        const token = await getToken();

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/clerk/sync`,
          { role },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        router.replace('/'); // Redirect to landing page
      } catch (err) {
        console.error("Sync failed", err);
        router.replace('/');
      }
    };

    syncUser();
  }, [user, isSignedIn, getToken, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Setting things up...</p>
    </div>
  );
}
