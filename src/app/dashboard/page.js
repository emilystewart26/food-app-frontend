"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { DivideSquare } from "lucide-react";
import UserDetails from "../globalComponents/UserDetails";
import Favourites from "../globalComponents/UserFavourites";
import UserReviews from "../globalComponents/UserReviews";


export default function ViewDashboard() {

const { user, isSignedIn, isLoaded } = useUser();
const router = useRouter();
  
  useEffect(() => {
    if (!isLoaded) return;

    // If not signed in, redirect to login
    if (!isSignedIn) {
      router.replace("/login");
      return;
    }

// If role is not user or admin, redirect
const role = user?.publicMetadata?.role;
if (!["user", "admin"].includes(role)) {
  router.replace("/unauthorized"); 
}
}, [isLoaded, isSignedIn, user, router]);

if (!isSignedIn || !["user", "admin"].includes(user?.publicMetadata?.role)) {
return null; 
}



  return (
    <div className="min-h-screen py-10 px-6">
      

      <div className="grid grid-cols-2 gap-4">
        {/*  User Details */}
        <section className="grid col-span-2">
          <UserDetails />
        </section>
  
        {/*  Favourites Section */}
        <section className="mb-10">
          <Favourites />
        </section>
  
  
        {/*  Reviews Section */}
        <section>
          <UserReviews />
        </section>
      </div>

    </div>
  );
}
