import axiosInstance from "./axiosInstance";

// logged-in patient profile
export const getPatientProfileApi = () =>
  axiosInstance.get("/api/patients/me");

// BMI
export const getPatientBmiApi = (patientId) =>
  axiosInstance.get(`/api/patients/${patientId}/bmi`);

// Medicine reminders
export const getMedicineRemindersApi = (patientId) =>
  axiosInstance.get(`/api/reminders/${patientId}`);

// Appointments
export const getAppointmentRemindersApi = (patientId) =>
  axiosInstance.get(`/api/appointments/${patientId}`);

// Period reminders
export const getPeriodRemindersApi = (patientId) =>
  axiosInstance.get(`/api/reminders/period/${patientId}`);

// Other reminders
export const getOtherRemindersApi = (patientId) =>
  axiosInstance.get(`/api/reminders/other/${patientId}`);
