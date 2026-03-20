import Button from "../HomePage/HomeButton";
import { Link, useNavigate } from "react-router-dom";
import PageHelmet from "../../components/PageHelmet";
import Login from "../../assets/loginIcon.png";
import { useState, useEffect } from "react";
import { loginApi } from "../../api/authApi";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState("");

  const registerLink = "/option";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    if (!email) {
      toast.error("Email is required", { id: "email-error" });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format", { id: "email-format-error" });
      return false;
    }

    if (!password) {
      toast.error("Password is required", { id: "password-error" });
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        id: "password-length-error",
      });
      return false;
    }

    return true;
  };

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setError("");
      const data = await loginApi(email, password);

      localStorage.setItem("token", data.token);

      const decode = jwtDecode(data.token);
      const role = decode.role;

      //parindya
      localStorage.setItem("role", role);

      toast.success("Login successful");

      if (role === "PATIENT") {
        navigate("/patient/medical-reports");
      } else if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        setError("Unknown User Role");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <>
      <PageHelmet
        title="Login | Healthify"
        description="Log in to Healthify to securely access your personal health monitoring dashboard, medical records, and digital healthcare tools."
      />
      <div className="min-h-screen flex flex-col bg-[#F2FBFA]">
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-16">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
            {/* LEFT IMAGE */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#EAF7F6]">
              <img
                src={Login}
                alt="login illustration"
                className="max-w-[420px] w-full p-8"
              />
            </div>

            {/* RIGHT FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-[#18AAB0] mb-2">
                  Welcome Back
                </h1>
                <p className="text-center text-gray-500 mb-6">
                  Login to your account
                </p>

                {errors && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {errors}
                  </p>
                )}

                {/* INPUTS */}
                <div className="flex flex-col gap-4">
                  {/* EMAIL */}
                  <input
                    type="email"
                    placeholder="Email address"
                    className="h-[48px] w-full px-4 rounded-xl border
                             border-secondary/30 bg-secondary/5
                             focus:outline-none focus:ring-2
                             focus:ring-[#18AAB0]/40 transition"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* PASSWORD WITH EYE */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-[48px] w-full px-4 pr-12 rounded-xl border
                               border-secondary/30 bg-secondary/5
                               focus:outline-none focus:ring-2
                               focus:ring-[#18AAB0]/40 transition"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2
                               text-gray-500 hover:text-[#18AAB0]"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* FORGOT PASSWORD */}
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-secondary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* LOGIN BUTTON */}
                <div className="mt-6">
                  <Button
                    onClick={handleLogin}
                    className="w-full py-3 text-[18px] rounded-xl"
                    type="button"
                    text="Login"
                    style={{ backgroundColor: "#18AAB0" }}
                  />
                </div>

                {/* SIGNUP */}
                <p className="text-center text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <Link
                    to={registerLink}
                    className="text-secondary font-medium hover:underline"
                  >
                    Signup here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
