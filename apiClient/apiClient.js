import axios from "axios";
import { useRouter } from 'next/navigation';

const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export class ApiClient {
  constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.removeToken();
          if (typeof window !== "undefined") {
            window.location.href = "/unauthorized";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  //Auth Methods

  async login(email, password) {
    console.log("test login");
    const response = await this.apiCall("post", "users/login", {
      email,
      password,
    });
    if (response.data?.token) {
      this.setToken(response.data.token);
      console.log("Token saved:", this.getToken()); // <-- Add this
      return response;
    } else {
      throw new Error("No token received from server");
    }
  }

  async register(email, password) {
    console.log("test register");
    return this.apiCall("post", "users/register", { email, password });
  }

  logout() {
    this.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  //Token Helpers

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
      this.axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      delete this.axiosInstance.defaults.headers["Authorization"];
    }
  }

  //Authentication Status

  isLoggedIn() {
    return !!this.getToken();
  }

  //API Call Handler

  async apiCall(method, path, data) {
    const fullUrl = `${url.replace(/\/$/, "")}/${path}`;
    console.log(`API Call: ${method} ${fullUrl}`, data);
    try {
      const response = await this.axiosInstance({ method, url: fullUrl, data });
      return response;
    } catch (error) {
      console.error("API call error:", {
  message: error.message,
  status: error?.response?.status,
  data: error?.response?.data,
  url: `${url.replace(/\/$/, "")}/${path}`,
});console.error("API call error:", error.response || error);
      if (error.response && error.response.status === 401) {
        this.removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/unauthorized";
        }
      }
      throw error;
      
    }
  }

  //Restaurant Methods

  //GET

  async getRestaurants() {
    const response = await this.apiCall("get", "restaurants");
    return response.data;
  }

  async getRestaurantById(id) {
    const response = await this.apiCall("get", `restaurants/${id}`);
    return response.data;
  }

  async getRestaurantsByUserId(userId) {
    const response = await this.apiCall("get", `restaurants/user/${userId}`);
    return response.data;
  }

  async getRestaurantsByName(name) {
    const response = await this.apiCall("get", `restaurants/name/${name}`);
    return response.data;
  }

  async getRestaurantsByCity(city) {
    const response = await this.apiCall("get", `restaurants/city/${city}`);
    return response.data;
  }

  async getRestaurantsWithin1km(lat, lng) {
    const response = await this.apiCall(
      "get",
      `restaurants/nearby/${lat}/${lng}`
    );
    return response.data;
  }

  async getRestaurantsWithin3km(lat, lng) {
    const response = await this.apiCall(
      "get",
      `restaurants/nearby/${lat}/${lng}`
    );
    return response.data;
  }

  async getRestaurantsWithin5km(lat, lng) {
    const response = await this.apiCall(
      "get",
      `restaurants/nearby/${lat}/${lng}`
    );
    return response.data;
  }

  //POST

  async addRestaurant(address, postcode, city, country) {
    return this.apiCall("post", "restaurants", {
      address,
      postcode,
      city,
      country,
    });
  }

  //PUT

  async updateRestaurant(id, address, postcode, city, country) {
    return this.apiCall("put", `restaurants/${id}`, {
      address,
      postcode,
      city,
      country,
    });
  }

  //DELETE

  async deleteRestaurant(id) {
    return this.apiCall("delete", `restaurants/${id}`);
  }
}






