import axiosInstance from "./axiosInstance";

//log in api
export const loginApi = async (email, password) => {
    const response = await axiosInstance.post(`/api/auth/login`, {
        email,
        password,
    });

    return response.data;
}

//patinet register api
export const registerPatientApi = async (patientData) => {
    const response = await axiosInstance.post(
        `/api/auth/patient/register`,
        patientData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}

//doctor register api
export const registerDoctorApi = async (formData) => {
    const response = await axiosInstance.post(
        `/api/auth/doctor/register`,
        formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
    );

    return response.data;
};

//otp verification
export const verifyOtpApi = (email, otp) =>
    axiosInstance.post(`/api/auth/verify-email`, null, {
    params: { email, otp }
  });

  //otp resend
export const resendOtpApi = (email) =>
    axiosInstance.post(`/api/auth/resend-otp`, null, {
    params: { email }
  });




