import axiosInstance from "./axiosInstance";

/**
 * Request password reset OTP
 * Sends OTP to user's email
 */
export const requestPasswordResetApi = async (email) => {
  const response = await axiosInstance.post(
    `/api/auth/password-reset/request`,
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
  const response = await axiosInstance.post(
    `/api/auth/password-reset/confirm`,
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
  const response = await axiosInstance.post(
    `/api/auth/password-reset/resend`,
    null,
    {
      params: { email }
    }
  );
  return response.data;
};