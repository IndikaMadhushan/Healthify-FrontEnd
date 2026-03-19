import axiosInstance from "./axiosInstance";

export const submitContactUsApi = async (payload) => {
  const response = await axiosInstance.post("/api/contact-us", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
