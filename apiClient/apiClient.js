import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_BASE_URL

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
    console.log (`[apiCall] Method: ${method}, Path: ${path}, Data: ${JSON.stringify(data)}`);
    console.log (`[apiCall] URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`);
  try {
    const response = await this.axiosInstance({
      method,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


  //Restaurant Methods

  //GET - universtal getRestaurants method by city / with geolocation + with optional additional filters (=queryString)
  async getRestaurants(queryString) {
  const path = queryString ? `restaurants?${queryString}` : "restaurants";
  const response = await this.apiCall("get", path);
  //console.log("[getRestaurants] Query:", queryString);
  //console.log("[getRestaurants] Response:", response);
  return response;
}

  async getRestaurantById(id) {
    const response = await this.apiCall("get", `restaurants/${id}`);
    return response
  }

  async getRestaurantsByUserId(userId) {
    const response = await this.apiCall("get", `restaurants/user/${userId}`);
    return response
  }

  //POST
  async addRestaurant(restaurantData) {    // changed this to accept a full data object
    return this.apiCall("post", "restaurants", restaurantData)
  }

  //PUT  - not part of MVP > likely needs refactoring if it is to be used lated 
  //async updateRestaurant(id, address, postcode, city, country /*as above*/) {
  //  return this.apiCall("put", `restaurants/${id}`, {address, postcode, city, country});
 // }

  //DELETE  - not part of MVP > likely needs refactoring if it is to be used lated 
  //async deleteRestaurant(id) {
   // return this.apiCall("delete", `restaurants/${id}`);
  //}

  //== Review Methods==

  //GET
  async getReviews() {
    const response = await this.apiCall("get", "reviews");
    return response
  }

  async getReviewsById(id) {
    const response = await this.apiCall("get", `reviews/${id}`);
    return response
  }

  async getReviewsByUserId(userId) {
    const response = await this.apiCall("get", `reviews/userid/${userId}`);
    return response
  }

  async getReviewsByRestaurantId(restaurantId) {
    const response = await this.apiCall(
      "get",
      `reviews/restaurantid/${restaurantId}`
    );
    return response
  }

  // POST
  async addReview(reviewData) {
    const response = await this.apiCall("post", "reviews", reviewData);
    return response;
  }

  //==Favourites Methods==

  //GET
  async getFavourites() {
    const response = await this.apiCall("get", "favourites");
    return response
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