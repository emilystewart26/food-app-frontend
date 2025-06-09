"use client";
import Link from "next/link";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploader from "../globalComponents/CloudinaryUploader";

const cld = new Cloudinary({ cloud: { cloudName: process.env.dx9lz1em1 } });

export default function CreateRestaurant() {
  return (
    <div className="flex-row text-center justify-items-center content-start h-screen bg-blue-100 text-black space-x-4">
      <h1 className="p-4 m-4 text-2xl font-bold text-slate-600">
        Create a page for your restaurant
      </h1>

      <CloudinaryUploader />
    </div>
  );
}
