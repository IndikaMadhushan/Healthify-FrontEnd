import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHelmet from "../../components/PageHelmet";
import { requestPasswordResetApi } from "../../api/PasswordResetApi";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await requestPasswordResetApi(email);
      setSuccess(true);
    } catch (err) {
      console.error("Password reset request failed:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    navigate("/reset-password", { state: { email } });
  };

  return (
    <>
      <PageHelmet
        title="Forgot Password | Healthify"
        description="Request a password reset for your Healthify account and receive a secure verification code to restore access."
      />
      <div className="min-h-screen bg-gradient-to-br from-[#F2FBFA] via-white to-[#EAF7F6] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-[#D3F0ED]">
            {/* Logo/Icon Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#18AAB0] to-[#86C443] flex items-center justify-center shadow-lg">
                <span className="text-4xl">🔑</span>
              </div>
            </div>

            {!success ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-[#0F4F52] mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-500 text-sm">
                    No worries! Enter your email and we'll send you a
                    verification code to reset your password.
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

                {/* Email Input */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0F4F52] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl 
                      focus:border-[#18AAB0] focus:ring-4 focus:ring-[#18AAB0]/20 
                      outline-none transition-all text-[#0F4F52]"
                      disabled={loading}
                    />
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
                        Sending OTP...
                      </span>
                    ) : (
                      "Send Verification Code"
                    )}
                  </button>
                </div>

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
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4">
                      <span className="text-4xl">✓</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F4F52] mb-2">
                      OTP Sent Successfully!
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      We've sent a 6-digit verification code to:
                    </p>
                    <p className="text-[#18AAB0] font-semibold text-sm">
                      {email}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      📧 Please check your email inbox (and spam folder) for the
                      verification code.
                    </p>
                  </div>

                  <button
                    onClick={handleProceed}
                    className="w-full py-4 rounded-full font-semibold text-white text-lg
                    bg-gradient-to-r from-[#18AAB0] to-[#86C443] 
                    hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-300 transform"
                  >
                    Proceed to Reset Password
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Bottom Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
