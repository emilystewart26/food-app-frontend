import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: url,
      withCredentials: true, // Required to send Clerk session cookies
    });
  }

  async apiCall(method, path, data = null) {
    try {
      const response = await this.axiosInstance({
        method,
        url: `/${path}`,
        data,
      });
      return response.data;
    } catch (error) {
      console.error(`[ApiClient Error] ${method.toUpperCase()} ${path}`, error);
      throw error;
    }
  }

  // RESTAURANT METHODS

  async getRestaurants(queryString = "") {
    const path = queryString ? `restaurants?${queryString}` : "restaurants";
    return this.apiCall("get", path);
  }

  async getRestaurantById(id) {
    return this.apiCall("get", `restaurants/${id}`);
  }

  async getRestaurantsByUserId(userId) {
    return this.apiCall("get", `restaurants/user/${userId}`);
  }

  async addRestaurant(name, address, city, country) {
    return this.apiCall("post", "restaurants", {
      name,
      address,
      city,
      country,
    });
  }

  async updateRestaurant(id, address, postcode, city, country) {
    return this.apiCall("put", `restaurants/${id}`, {
      address,
      postcode,
      city,
      country,
    });
  }

  async deleteRestaurant(id) {
    return this.apiCall("delete", `restaurants/${id}`);
  }

  //  REVIEW METHODS 

  async getReviews() {
    return this.apiCall("get", "reviews");
  }

  async getReviewsById(id) {
    return this.apiCall("get", `reviews/${id}`);
  }

  async getReviewsByUserId(userId) {
    return this.apiCall("get", `reviews/userid/${userId}`);
  }

  async getReviewsByRestaurantId(restaurantId) {
    return this.apiCall("get", `reviews/restaurantid/${restaurantId}`);
  }

  async addReview(data) {
    return this.apiCall("post", "reviews", data);
  }

  //  FAVOURITES METHODS

  async getFavourites() {
    return this.apiCall("get", "favourites");
  }

  async addToFavourites(restaurantId) {
    return this.apiCall("post", `favourites/${restaurantId}`);
  }

  async removeFromFavourites(restaurantId) {
    return this.apiCall("delete", `favourites/${restaurantId}`);
  }
}
