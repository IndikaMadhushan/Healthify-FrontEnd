import axiosInstance from "./axiosInstance";

// 🔹 DOCTOR: get clinic books of a patient
export const getClinicBooksByPatientId = (patientId) => {
  return axiosInstance.get(`/api/v1/cbook/patient/${patientId}`);
};

// 🔹 PATIENT: get own clinic books
export const getMyClinicBooks = () => {
  return axiosInstance.get("/api/v1/cbook/patient-clinic");
};
