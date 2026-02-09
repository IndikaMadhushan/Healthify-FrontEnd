import axiosInstance from "./axiosInstance";

// 🔹 DOCTOR: get clinic books of a patient
export const getClinicBooksByPatientId = (patientId) => {
  return axiosInstance.get(`/api/v1/cbook/patient/${patientId}`);
};

// 🔹 PATIENT: get own clinic books
export const getMyClinicBooks = () => {
  return axiosInstance.get("/api/v1/cbook/patient-clinic");
};

// get unique clinic book important data like dr name reason....
export const getUniqueClinicBookData = (clinicBookId) => {
  return axiosInstance.get(`/api/v1/cbook/clinic_data/${clinicBookId}`);
};

//get patient all clinic bookby doctor  api/v1/cbook/patient/8 ///not yet connect to frontend
export const getAllPatientClinicBooks = (patientId) => {
  return axiosInstance.get(`/api/v1/cbook/patient/${patientId}`);
};

export const createClinicBook = (patientId,data) => {
  return axiosInstance.post(`/api/v1/cbook/create/${patientId}`,data);
};

export const editClinicBook = (clinicBookId,data) => {
  return axiosInstance.put(`/api/v1/cbook/${clinicBookId}`,data);
};