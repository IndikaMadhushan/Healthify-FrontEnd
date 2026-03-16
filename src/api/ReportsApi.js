import axiosInstance from "./axiosInstance";

export const uploadPatientReportApi = (
  patientId,
  reportType,
  file,
  reportDate
) => {
  const formData = new FormData();
  formData.append("reportType", reportType);
  if (reportDate) {
    formData.append("reportDate", reportDate);
  }
  formData.append("file", file);

  return axiosInstance.post(
    `/api/doctors/reports/patient/${patientId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};
