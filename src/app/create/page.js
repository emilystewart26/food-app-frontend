"use client";
import Link from "next/link";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { CldUploadWidget } from "next-cloudinary";

const cld = new Cloudinary({ cloud: { cloudName: process.env.dx9lz1em1 } });

export default function CreateRestaurant() {
  return (
    <div className="flex-row text-center justify-items-center content-start h-screen bg-blue-100 text-black space-x-4">
      <h1 className="p-4 m-4 text-2xl font-bold text-slate-600">
        Create a page for your restaurant
      </h1>
      <section>
        <CldUploadWidget uploadPreset="foodapp_widget">
          {({ open }) => {
            return (
              <button
                className="flex p-4 bg-transparent hover:bg-slate-600 text-slate-600 hover:text-blue-100 font-bold py-2 px-4 border rounded"
                onClick={() => open()}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
      </section>
    </div>
  );
}
