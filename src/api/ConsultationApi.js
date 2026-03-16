

import axiosInstance from "./axiosInstance";


// ================= GET CONSULT CARD BY PATIENT =================
export const getConsultCardByPatient = () => {
  return axiosInstance.get(
    "/api/v1/consult/get-by-patient"
  );
};


// ================= GET CONSULT CARD BY DOCTOR =================
export const getConsultCardByDoctor = (patientId) => {
  return axiosInstance.get(
    `/api/v1/consult/${patientId}`
  );
};


// ================= GET CONSULT PAGE =================
export const getConsultPageById = (consultId) => {
  return axiosInstance.get(
    `/api/v1/consult/page/${consultId}`
  );
};


// ================= CREATE CONSULT PAGE =================
export const createConsultPage = (patientId, requestBody) => {
  return axiosInstance.post(
    `/api/v1/consult/${patientId}`,
    requestBody
  );
};




