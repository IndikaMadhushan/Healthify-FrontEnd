import axiosInstance from "./axiosInstance";

export const getClinicPagesByClinicBookId = (clinicBookId) => {
  return axiosInstance.get(
    `/api/v1/cpage/by-clinic-book/${clinicBookId}`
    
  );
};

export const getClinicPageById = (Id) => {
  return axiosInstance.get(
    `/api/v1/cpage/${Id}`
  );
};