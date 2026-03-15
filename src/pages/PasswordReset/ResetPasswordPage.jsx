import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  confirmPasswordResetApi,
  resendPasswordResetOtpApi,
} from "../../api/PasswordResetApi";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Redirect if no email provided
  useEffect(() => {
    if (!userEmail) {
      navigate("/forgot-password", { replace: true });
    }
  }, [userEmail, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex].focus();
  };

  const validatePassword = () => {
    const errors = {};

    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      errors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async () => {
    setError("");
    setFieldErrors({});

    const otpValue = otp.join("");

    // Validate OTP
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    // Validate passwords
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordResetApi(userEmail, otpValue, newPassword);

      toast.success(
        "Password reset successful! You can now login with your new password."
      );
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Password reset failed:", err);
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response?.data
          : "Invalid OTP or password reset failed. Please try again.");
      setError(message);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      await resendPasswordResetOtpApi(userEmail);
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      toast.success("New OTP sent to your email!");
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response?.data
          : "Failed to resend OTP. Please try again.");
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FBFA] via-white to-[#EAF7F6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-[#D3F0ED]">
          {/* Logo/Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#18AAB0] to-[#86C443] flex items-center justify-center shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0F4F52] mb-2">
              Reset Password
            </h1>
            <p className="text-gray-500 text-sm">Enter the OTP sent to</p>
            <p className="text-[#18AAB0] font-semibold text-sm mt-1">
              {userEmail}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm text-center font-medium">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* OTP Input Boxes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0F4F52] mb-3">
              Verification Code
            </label>
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 
                    transition-all duration-200 outline-none
                    ${
                      digit
                        ? "border-[#18AAB0] bg-[#F7FCFB] text-[#0F4F52]"
                        : "border-[#D3F0ED] bg-white text-gray-400"
                    }
                    focus:border-[#18AAB0] focus:ring-4 focus:ring-[#18AAB0]/20
                    hover:border-[#86C443]
                  `}
                />
              ))}
            </div>
          </div>

          {/* Timer / Resend */}
          <div className="text-center mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="text-lg">⏱️</span>
                <span>Resend code in</span>
                <span className="font-bold text-[#18AAB0]">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                className="text-[#18AAB0] font-semibold text-sm hover:text-[#86C443] 
                  transition-colors duration-200 underline decoration-2 underline-offset-4"
              >
                Resend Verification Code
              </button>
            )}
          </div>

          {/* Password Inputs */}
          <div className="space-y-4 mb-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setFieldErrors({ ...fieldErrors, newPassword: "" });
                  }}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 border-2 rounded-xl 
                    focus:ring-4 focus:ring-[#18AAB0]/20 
                    outline-none transition-all text-[#0F4F52] pr-12
                    ${
                      fieldErrors.newPassword
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#D3F0ED] focus:border-[#18AAB0]"
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {fieldErrors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFieldErrors({ ...fieldErrors, confirmPassword: "" });
                  }}
                  placeholder="Re-enter new password"
                  className={`w-full px-4 py-3 border-2 rounded-xl 
                    focus:ring-4 focus:ring-[#18AAB0]/20 
                    outline-none transition-all text-[#0F4F52] pr-12
                    ${
                      fieldErrors.confirmPassword
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#D3F0ED] focus:border-[#18AAB0]"
                    }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
            <p className="text-xs text-blue-800 font-medium mb-1">
              Password must contain:
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
              <li>• One number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-full font-semibold text-white text-lg
              transition-all duration-300 transform
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#18AAB0] to-[#86C443] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-500 hover:text-[#0F4F52] transition-colors duration-200 flex items-center justify-center gap-1 mx-auto"
            >
              <span>←</span>
              <span>Back to Login</span>
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            🔒 Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
