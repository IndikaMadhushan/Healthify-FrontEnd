import axiosInstance from "./axiosInstance";

export const getDoctorNotePatient = () => {
  return axiosInstance.get(
    `/api/v1/drnote/patientViewNote`
    
  );
};

export const getDoctorNoteDoctor = (patientId) => {
  return axiosInstance.get(
    `/api/v1/drnote/DoctorViewNote/${patientId}`
  );
};


