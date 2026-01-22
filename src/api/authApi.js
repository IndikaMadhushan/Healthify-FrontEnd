import axios from "axios";

const  API_BASE_URL = "http://localhost:8080/api";

//log in api
export const loginApi = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
    });

    return response.data;
}

//patinet register api
export const registerPatientApi = async (patientData) => {
    const response = await axios.post(
        `${API_BASE_URL}/auth/patient/register`,
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
    const response = await axios.post(
        `${API_BASE_URL}/auth/doctor/register`,
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
  axios.post(`${API_BASE_URL}/auth/verify-email`, null, {
    params: { email, otp }
  });

  //otp resend
export const resendOtpApi = (email) =>
  axios.post(`${API_BASE_URL}/auth/resend-otp`, null, {
    params: { email }
  });




