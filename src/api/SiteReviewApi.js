import axiosInstance from "./axiosInstance";

export const getSiteReviewEligibility = async () => {
  const response = await axiosInstance.get("/api/patients/me/site-review/eligibility");
  return response.data;
};

export const createSiteReview = async (payload) => {
  const response = await axiosInstance.post("/api/patients/me/site-review", payload);
  return response.data;
};

export const getMySiteReview = async () => {
  const response = await axiosInstance.get("/api/patients/me/site-review", {
    validateStatus: (status) => (status >= 200 && status < 300) || status === 204,
  });

  if (response.status === 204) {
    return null;
  }

  return response.data;
};

export const getPendingSiteReviewsApi = async () => {
  const response = await axiosInstance.get("/api/admin/site-reviews/pending");
  return response.data;
};

export const approveSiteReviewApi = async (reviewId) => {
  const response = await axiosInstance.put(`/api/admin/site-reviews/${reviewId}/approve`);
  return response.data;
};

export const rejectSiteReviewApi = async (reviewId) => {
  const response = await axiosInstance.put(`/api/admin/site-reviews/${reviewId}/reject`);
  return response.data;
};

export const getPublicSiteReviewsApi = async () => {
  const response = await axiosInstance.get("/api/site-reviews/public");
  return response.data;
};
