"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
//import { Cloudinary } from "@cloudinary/url-gen";
import CreateRestaurant from "../globalComponents/CreateRestaurant";


export default function CreateRestaurantPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  // const cld = new Cloudinary({ cloud: { cloudName: process.env.dx9lz1em1 } });

  useEffect(() => {
    if (!isLoaded) return;

    // If not signed in, redirect to login
    if (!isSignedIn) {
      router.replace("/login");
      return;
    }

// If role is not vendor or admin, redirect
const role = user?.publicMetadata?.role;
if (!["vendor", "admin"].includes(role)) {
  router.replace("/unauthorized"); 
}
}, [isLoaded, isSignedIn, user, router]);

if (!isSignedIn || !["vendor", "admin"].includes(user?.publicMetadata?.role)) {
return null; 
}

  return (
    <div className="flex-row content-start text-black space-x-4 mb-10">
      <CreateRestaurant />  
    </div>
  );
}
