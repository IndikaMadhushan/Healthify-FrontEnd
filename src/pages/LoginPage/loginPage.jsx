// import Button from "../HomePage/HomeButton";
// import { Link, useNavigate } from "react-router-dom";
// import Login from "../../assets/loginIcon.png";
// import Footer from "../../components/footer";
// import Header from "../HomePage/Header";
// import { useState, useEffect } from "react";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Scroll to top on component mount when the page loads. edited by thathsara..
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   console.log(email);
//   return (
//     <div>
//       <Header />
//       <div className="flex lg:flex-row flex-col lg:justify-center  items-center lg:items-start w-full lg:h-[700px] p-6 sm:pt-20">
//         <div>
//           <img className="p-5" src={Login} alt="login image" />
//         </div>
//         <div className="lg:w-1/2  flex justify-center items-center">
//           <div className="flex flex-col gap-3 sm:w-[500px] p-2">
//             <h1 className="text-3xl font-bold text-mainblack text-center mb-5">
//               Login
//             </h1>
//             <div className="flex flex-col items-center gap-2">
//               <input
//                 type="text"
//                 className=" sm:w-[480px] w-[300px] sm:h-[45px] border-2 px-2 border-secondary/30 bg-secondary/5 hover:border-secondary rounded-xl "
//                 onChange={(e) => setEmail(e.target.value)}
//               ></input>
//               <input
//                 type="text"
//                 className=" sm:w-[480px] w-[300px] sm:h-[45px] border-2 px-2 border-secondary/30 bg-secondary/5 hover:border-secondary  rounded-xl  "
//                 onChange={(e) => setPassword(e.target.value)}
//               ></input>
//             </div>

//             <p className="text-secondary hover:underline text-[10px] text-end">
//               <Link to="/forget" className="">
//                 Forgot password?
//               </Link>
//             </p>
//             <div className="flex justify-center">
//               <Button
//                 onClick={() => navigate("/option")}
//                 className=" sm:w-[480px] w-[300px] px-10 mt-5 py-2 md:text-[20px]  text-sm "
//                 type="button"
//                 text="Login"
//                 style={{ backgroundColor: `#18AAB0` }}
//               />
//             </div>
//             <div className="text-center sm:text-[20px] text-[16px]">
//               Don’t have an account?
//               <span className="text-secondary hover:underline">
//                 <Link to="/option" className="">
//                   Signup here
//                 </Link>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


// import Button from "../HomePage/HomeButton";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../HomePage/Header";
// import { useState, useEffect } from "react";
// import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">


//       {/* BACKGROUND IMAGE SECTION */}
//       <div
//         className="flex flex-1 items-center justify-center px-8 md:justify-end md:px-40 relative"
//         style={{
//           backgroundImage: "url('/m3.jpg')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-[#18AAB0]/20 backdrop-blur-[1px]" />

//         {/* LOGIN CARD */}
//         <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl
//                         rounded-2xl shadow-2xl border border-white/30 p-8">

//           {/* TITLE */}
//           <h1 className="text-3xl font-bold text-center text-[#18AAB0] mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-center text-gray-600 mb-6">
//             Login to your account
//           </p>

//           {/* INPUTS */}
//           <div className="flex flex-col gap-4">

//             {/* EMAIL */}
//             <div className="relative">
//               <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#18AAB0]" />
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className="h-[48px] w-full pl-12 pr-4 rounded-xl
//                            border border-[#86C443]/30
//                            bg-[#86C443]/10
//                            focus:outline-none
//                            focus:ring-2 focus:ring-[#18AAB0]/40
//                            transition"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* PASSWORD */}
//             <div className="relative">
//               <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#18AAB0]" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="h-[48px] w-full pl-12 pr-4 rounded-xl
//                            border border-[#86C443]/30
//                            bg-[#86C443]/10
//                            focus:outline-none
//                            focus:ring-2 focus:ring-[#18AAB0]/40
//                            transition"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* FORGOT PASSWORD */}
//           <div className="text-right mt-2">
//             <Link
//               to="/forget"
//               className="text-sm text-[#18AAB0] hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* LOGIN BUTTON */}
//           <div className="mt-6">
//             <Button
//               onClick={() => navigate("/option")}
//               className="w-full py-3 text-[18px] rounded-xl flex items-center justify-center gap-2"
//               type="button"
//               text={
//                 <span className="flex items-center gap-2">
//                    Login
//                 </span>
//               }
//               style={{ backgroundColor: "#18AAB0" }}
//             />
//           </div>

//           {/* DIVIDER */}
//           <div className="flex items-center my-6">
//             <div className="flex-1 h-px bg-gray-300" />
//             <span className="px-3 text-sm text-gray-500">OR</span>
//             <div className="flex-1 h-px bg-gray-300" />
//           </div>

//           {/* SIGNUP */}
//           <p className="text-center text-gray-700">
//             Don’t have an account?{" "}
//             <Link
//               to="/option"
//               className="text-[#18AAB0] font-medium hover:underline inline-flex items-center gap-1"
//             >
//               Signup here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import Button from "../HomePage/HomeButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../../assets/loginIcon.png";
// import Footer from "../../components/footer";
// import Header from "../HomePage/Header";
import { useState, useEffect } from "react";
import { q } from "framer-motion/client";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const role = location.state?.role;
  const registerLink = role === "DOCTOR" ? "/doctor-register-1" : "/patient-register-1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (password === "Password123" && email === "doctor@example.com" && role === "DOCTOR") {
      navigate("/doctor-dashboard");
    } else if (password === "Password123" && email === "patient@example.com" && role === "PATIENT") {
      navigate("/patient-dashboard");
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2FBFA]">


      {/* MAIN CONTENT */}
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

              {/* INPUTS */}
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-[48px] w-full px-4 rounded-xl border
                             border-secondary/30 bg-secondary/5
                             focus:outline-none focus:ring-2
                             focus:ring-[#18AAB0]/40 transition"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="h-[48px] w-full px-4 rounded-xl border
                             border-secondary/30 bg-secondary/5
                             focus:outline-none focus:ring-2
                             focus:ring-[#18AAB0]/40 transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right mt-2">
                <Link
                  to="/forget"
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <div className="mt-6">

                <Button
                  // onClick={() => navigate("/option")}
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
  );
}



