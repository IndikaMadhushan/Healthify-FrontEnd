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