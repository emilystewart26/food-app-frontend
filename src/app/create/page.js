"use client";
import Link from "next/link";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CreateRestaurant from "../globalComponents/CreateRestaurant";

const cld = new Cloudinary({ cloud: { cloudName: process.env.dx9lz1em1 } });

export default function CreateRestaurantPage() {
  return (
    <div className="flex-row text-center justify-items-center content-start h-screen bg-blue-100 text-black space-x-4">
      {/* <h1 className="p-4 m-4 text-2xl font-bold text-slate-600">
        Create a page for your establishment
      </h1> */}
      <CreateRestaurant />

      
    </div>
  );
}
