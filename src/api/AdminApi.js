import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Get pending doctor registrations
export const getPendingDoctorsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/pending-doctors`);
  return response.data;
};

// Approve doctor by user ID
export const approveDoctorApi = async (userId) => {
  const response = await axios.put(`${API_BASE_URL}/admin/approve-doctor/${userId}`);
  return response.data;
};

// Get doctor details by doctor ID
export const getDoctorByIdApi = async (doctorId) => {
  const response = await axios.get(`${API_BASE_URL}/admin/doctors/${doctorId}`);
  return response.data;
};

// Get patient details by patient ID (returns limited info for admin)
export const getPatientByIdApi = async (patientId) => {
  const response = await axios.get(`${API_BASE_URL}/admin/patients/${patientId}`);
  return response.data;
};

// Get all audit logs
export const getAllAuditLogsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/audit-logs`);
  return response.data;
};

// Get audit logs by patient ID
export const getAuditLogsByPatientApi = async (patientId) => {
  const response = await axios.get(`${API_BASE_URL}/admin/audit-logs/patient/${patientId}`);
  return response.data;
};

// Get audit logs by doctor email
export const getAuditLogsByDoctorApi = async (doctorEmail) => {
  const response = await axios.get(`${API_BASE_URL}/admin/audit-logs/doctor`, {
    params: { email: doctorEmail }
  });
  return response.data;
};