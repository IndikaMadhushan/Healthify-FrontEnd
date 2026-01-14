import axios from "axios";

const  API_BASE_URL = "http://localhost:8080/api/auth";

//log in api
export const loginApi = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
    });

    return response.data;
}

//patinet register api
export const registerPatientApi = async (patientData) => {
    const response = await axios.post(
        `${API_BASE_URL}/patient/register`,
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
        `${API_BASE_URL}/doctor/register`,
        formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
    );

    return response.data;
};
