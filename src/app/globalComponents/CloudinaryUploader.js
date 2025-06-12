// in walkthrough i'm following this file is .jsx 
// making note in case needed for debugging

'use client';
import { CldUploadWidget } from "next-cloudinary";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = () => {
    return (
        <div>
            <CldUploadWidget 
            options={{ multiple: true }} 
            uploadPreset={"foodapp_widget"}
            >
          {({ open }) => {
            return (
              <button
                className="flex p-4 bg-transparent hover:bg-slate-600 text-slate-600 hover:text-blue-100 font-bold py-2 px-4 border rounded"
                onClick={() => open()}>
                Upload Images
              </button>
            );
          }}
        </CldUploadWidget>
        </div>
    );
};

export default CloudinaryUploader;