import axiosInstance from "./axiosInstance";

export const getDoctorProfileApi = async () => {
  const cached = localStorage.getItem("doctor_me_cache");

  if (cached) {
    const { data, expiresAt } = JSON.parse(cached);
    if (Date.now() < expiresAt) {
      return { data };
    }
  }

  const res = await axiosInstance.get("/api/doctors/me");

  localStorage.setItem(
    "doctor_me_cache",
    JSON.stringify({
      data: res.data,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
    })
  );

  return res;
};
