import axiosInstance from "./axiosInstance";

export const getClinicPagesByClinicBookId = (clinicBookId) => {
  return axiosInstance.get(
    `/api/v1/cpage/by-clinic-book/${clinicBookId}`
  );
};

export const getClinicPageById = (clinicPageId) => {
  return axiosInstance.get(
    `/api/v1/cpage/${clinicPageId}`
  );
};