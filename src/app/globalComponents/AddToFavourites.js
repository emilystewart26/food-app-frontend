"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function AddToFavourites({ restaurantId }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { getToken } = useAuth();

  // Check if this restaurant is already in favourites
  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites`,
          config
        );

        const favourites = Array.isArray(res.data.favourites)
          ? res.data.favourites
          : [];

        const found = favourites.some(
          (fav) =>
            fav._id === restaurantId || fav.restaurantId === restaurantId
        );
        setIsFavourite(found);
      } catch (error) {
        console.error("Error fetching favourites", error);
      }
    };

    checkFavourite();
  }, [restaurantId, getToken]);

  //  Toggle favourite on button click
  const handleToggleFavourite = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/favourites/${restaurantId}`;

      if (isFavourite) {
        await axios.delete(url, config);
        setIsFavourite(false);
      } else {
        await axios.post(url, {}, config);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favourite", error);
    }
  };

  return (
    <button 
  onClick={handleToggleFavourite}
  className="hover:cursor-pointer rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 active:from-yellow-400 h-12 w-16 flex items-center justify-center overflow-hidden text-white ml-auto"
  aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
>
  {isFavourite ? (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 39.836 39.835" 
      fill="currentColor" 
      className="w-5 h-5"
    >
      <path d="M39.836,14.742c0,1.259-0.193,2.504-0.574,3.701c-1.977,8.336-16.367,17.583-18.008,18.614
        c-0.406,0.256-0.869,0.383-1.33,0.383c-0.463,0-0.924-0.127-1.33-0.383C16.951,36.025,2.547,26.775,0.576,18.44
        C0.193,17.234,0,15.99,0,14.741C0,10.25,2.443,6.109,6.379,3.932c1.826-1.005,3.887-1.536,5.959-1.536
        c2.779,0,5.434,0.926,7.582,2.599c2.145-1.673,4.797-2.599,7.576-2.599c2.08,0,4.141,0.531,5.959,1.535
        C37.393,6.109,39.836,10.251,39.836,14.742z"/>
    </svg>
  ) : (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 485 485" 
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M343.611,22.543c-22.613,0-44.227,5.184-64.238,15.409c-13.622,6.959-26.136,16.205-36.873,27.175
        c-10.738-10.97-23.251-20.216-36.873-27.175c-20.012-10.225-41.625-15.409-64.239-15.409C63.427,22.543,0,85.97,0,163.932
        c0,55.219,29.163,113.866,86.678,174.314c48.022,50.471,106.816,92.543,147.681,118.95l8.141,5.261l8.141-5.261
        c40.865-26.406,99.659-68.479,147.682-118.95C455.838,277.798,485,219.151,485,163.932C485,85.97,421.573,22.543,343.611,22.543z
        M376.589,317.566c-42.918,45.106-95.196,83.452-134.089,109.116c-38.893-25.665-91.171-64.01-134.088-109.116
        C56.381,262.884,30,211.194,30,163.932c0-61.42,49.969-111.389,111.389-111.389c35.361,0,67.844,16.243,89.118,44.563
        l11.993,15.965l11.993-15.965c21.274-28.32,53.757-44.563,89.118-44.563c61.42,0,111.389,49.969,111.389,111.389
        C455,211.194,428.618,262.884,376.589,317.566z"/>
    </svg>
  )}
</button>
  );
}
