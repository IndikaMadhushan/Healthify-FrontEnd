import axiosInstance from "./axiosInstance";

export const getConsultCardByPatient = () => {
  return axiosInstance.get(
    `/api/v1/consult/get-by-patient`
    
  );
};

export const getConsultCardByDoctor = (patientId) => {
  return axiosInstance.get(
    `/api/v1/consult/${patientId}`
    
  );
};

export const  getConsultPageById = (consultId) => {
  return axiosInstance.get(
    `/api/v1/consult/page/${consultId}`
    
  );
};


