import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Request password reset OTP
 * Sends OTP to user's email
 */
export const requestPasswordResetApi = async (email) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/password-reset/request`,
    null,
    {
      params: { email }
    }
  );
  return response.data;
};

/**
 * Confirm password reset with OTP and new password
 */
export const confirmPasswordResetApi = async (email, otp, newPassword) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/password-reset/confirm`,
    {
      email,
      otp,
      newPassword
    }
  );
  return response.data;
};

/**
 * Resend password reset OTP
 */
export const resendPasswordResetOtpApi = async (email) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/password-reset/resend`,
    null,
    {
      params: { email }
    }
  );
  return response.data;
};