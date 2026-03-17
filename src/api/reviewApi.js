import axios from "./axiosInstance"; // your existing axios file

export const addReview = (data) => {
  return axios.post("/api/reviews", data);
};

export const getAllReviews = () => {
  return axios.get("/api/reviews");
};