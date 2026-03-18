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

export const createClinicPageById = (id, data) => {
  return axiosInstance.post(`/api/v1/cpage/${id}`, data);
};


export const requestEditApproval = (clinicPageId) => {
  return axiosInstance.post(`/api/v1/cpage/request-edit/${clinicPageId}`);
};

export const updateClinicPage= (id, body) => {
  return axiosInstance.put(`/api/v1/cpage/${id}`, body);
};

export const deleteClinicPage = (id) => {
  return axiosInstance.delete(`/api/v1/cpage/${id}`);
};

export const getClinicPagesByBook = (id) => {
  return axiosInstance.get(`/api/v1/cpage/list/${id}`);
};