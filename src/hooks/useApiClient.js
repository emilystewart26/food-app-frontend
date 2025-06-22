"use client";
import { useAuth } from '@clerk/nextjs'; 
import { useEffect, useState } from "react";
import { ApiClient } from "../../apiClient/apiClient"; 

export const useApiClient = () => {
  const [client, setClient] = useState(null);
  const { getToken } = useAuth(); 

  useEffect(() => {
    const setupClient = async () => {
      try {
        const token = await getToken();
        const api = new ApiClient(token);
        setClient(api);
      } catch (err) {
        console.error("Failed to initialize API client:", err);
      }
    };

    setupClient();
  }, [getToken]);

  return client;
};
