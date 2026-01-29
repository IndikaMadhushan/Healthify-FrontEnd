import axios from "axios";
import axiosInstance from "./axiosInstance";


const API_BASE_URL = "http://localhost:8080/api/admin";

// Get pending doctor registrations
export const getPendingDoctorsApi = async () => {
  const response = await axiosInstance.get(`/api/admin/pending-doctors`);
  return response.data;
};

// Approve doctor by user ID
export const approveDoctorApi = async (userId) => {
  const response = await axiosInstance.put(`/api/admin/approve-doctor/${userId}`);
  return response.data;
};

// Reject doctor by user ID
export const rejectDoctorApi = async (userId) => {
  const response = await axiosInstance.delete(`/api/admin/reject-doctor/${userId}`);
  return response.data;
};

// Get doctor details by doctor ID
export const getDoctorByIdApi = async (doctorId) => {
  const response = await axiosInstance.get(`/api/admin/doctors/${doctorId}`);
  return response.data;
};

// Toggle doctor account status by doctor ID
export const toggleDoctorStatusApi = async (doctorId) => {
  const response = await axiosInstance.put(`/api/admin/doctors/${doctorId}/toggle-status`);
  return response.data;
};

// Get patient details by patient ID (returns limited info for admin)
export const getPatientByIdApi = async (patientId) => {
  const response = await axiosInstance.get(`/api/admin/patients/${patientId}`);
  return response.data;
};

// Toggle patient account status by patient ID
export const togglePatientStatusApi = async (patientId) => {
  const response = await axiosInstance.put(`/api/admin/patients/${patientId}/toggle-status`);
  return response.data;
};

// Get all audit logs
export const getAllAuditLogsApi = async () => {
  const response = await axiosInstance.get(`/api/admin/audit-logs`);
  return response.data;
};

// Get audit logs by patient ID
export const getAuditLogsByPatientApi = async (patientId) => {
  const response = await axiosInstance.get(`/api/admin/audit-logs/patient/${patientId}`);
  return response.data;
};

// Get audit logs by doctor email
export const getAuditLogsByDoctorApi = async (doctorEmail) => {
  const response = await axiosInstance.get(`/api/admin/audit-logs/doctor`, {
    params: { email: doctorEmail }
  });
  return response.data;
};