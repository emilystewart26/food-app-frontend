import axios from "axios";
import { useRouter } from "next/navigation";

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

  //==Auth Methods==

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

  async register(username, email, password, role) {
    console.log("test register");
    return this.apiCall("post", "users/register", {
      username,
      email,
      password,
      role,
    });
  }

  logout() {
    this.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  //==Token Helpers==

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

  //==Authentication Status==

  isLoggedIn() {
    return !!this.getToken();
  }

  //==API Call Handler==

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
      });
      console.error("API call error:", error.response || error);
      if (error.response && error.response.status === 401) {
        this.removeToken();
        if (typeof window !== "undefined") {
          window.location.href = "/unauthorized";
        }
      }
      throw error;
    }
  }

  //==Restaurant Methods==

  //GET - universtal getRestaurants method by city / with geolocation + with optional additional filters (=queryString)

  async getRestaurants(queryString) {
    const response = await this.apiCall("get", `restaurants?${queryString}`);
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

  //POST

  //Favourite Methods
  async addToFavourites(restaurantId) {
    return this.apiCall("post", `favourites/${restaurantId}`);
  }

  async removeFromFavourites(restaurantId) {
    return this.apiCall("delete", `favourites/${restaurantId}`);
  }

  async addRestaurant(
    name,
    address,
    city,
    country /* review Restaurant Schema & check what needs to be listed here*/
  ) {
    return this.apiCall("post", "restaurants", {
      name,
      address,
      city,
      country,
      // review Restaurant Schema & check if anything else needs to be listed here
    });
  }

  //PUT

  async updateRestaurant(id, address, postcode, city, country /*as above*/) {
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

  //== Review Methods==

  //GET

  async getReviews() {
    const response = await this.apiCall("get", "reviews");
    return response.data;
  }

  async getReviewsById(id) {
    const response = await this.apiCall("get", `reviews/${id}`);
    return response.data;
  }

  async getReviewsByUserId(userId) {
    const response = await this.apiCall("get", `reviews/userid/${userId}`);
    return response.data;
  }

  async getReviewsByRestaurantId(restaurantId) {
    const response = await this.apiCall(
      "get",
      `reviews/restaurantid/${restaurantId}`
    );
    return response.data;
  }

  // POST
  async addReview(
    foodReview,
    foodStars,
    ambienceReview,
    ambienceStars,
    serviceReview,
    serviceStars,
    locationReview,
    locationStars,
    userId,
    restaurantId
  ) {
    const response = await this.apiCall("post", "reviews", {
      foodReview,
      foodStars,
      ambienceReview,
      ambienceStars,
      serviceReview,
      serviceStars,
      locationReview,
      locationStars,
      userId,
      restaurantId,
    });
    return response.data;
  }

  /* Not sure what this code is for, leftover from something else? */
  async submitReview(reviewData) {
    return this.apiCall("post", "reviews", reviewData);
  }

  /* No corresponding code in backend for PUT/DELETE yet */

  // //PUT

  // async editReview(
  //   foodReview,
  //   foodStars,
  //   ambienceReview,
  //   ambienceStars,
  //   serviceReview,
  //   serviceStars,
  //   locationReview,
  //   locationStars,
  //   userId,
  //   restaurantId) {
  //     return this.apiCall("put", `restaurants/${id}`, {
  //        foodReview,
  //     foodStars,
  //     ambienceReview,
  //     ambienceStars,
  //     serviceReview,
  //     serviceStars,
  //     locationReview,
  //     locationStars,
  //     userId,
  //     restaurantId
  //     });
  //   }

  //   //DELETE

  //   async deleteReview(id) {
  //     return this.apiCall("delete", `reviews/${id}`);
  //   }
}

//=================== TODO:

//     /users/favourites = Favourite Routes
//  getFavourites  "GET"  "/"    >>>>>>>TODO: double-check backend code - should this be by user ID ???
//  addToFavourites  "POST" "/:restaurantId"
//  removeFromFavourites "DELETE"  ""/:restaurantId""
