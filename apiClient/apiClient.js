import axios from "axios";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export class ApiClient {
  constructor(token = null) {
    this.token = token;

    this.axiosInstance = axios.create({
      baseURL: url,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers["Authorization"] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async apiCall(method, path, data = {}) {
    try {
      const response = await this.axiosInstance({
        method,
        url: path,
        data,
      });
      return response.data;
    } catch (error) {
      console.error("API error:", error?.response?.data || error.message);
      throw error;
    }
  }


  //Restaurant Methods
  
  //GET - universtal getRestaurants method by city / with geolocation + with optional additional filters (=queryString)
  async getRestaurants(queryString) {
    const response = await this.apiCall("get", `restaurants?${queryString}`);
    console.log(queryString);
    console.log(response)
    return response
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

  //==Favourites Methods==

  //GET
  async getFavourites() {
    const response = await this.apiCall("get", "favourites");
    return response.data;
  }

  //POST
  async addToFavourites(restaurantId) {
    return this.apiCall("post", `favourites/${restaurantId}`);
  }

  //DELETE
  async removeFromFavourites(restaurantId) {
    return this.apiCall("delete", `favourites/${restaurantId}`);
  }
}
