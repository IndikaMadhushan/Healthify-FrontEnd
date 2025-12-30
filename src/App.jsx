import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import OptionPage from "./pages/SignupOptionPage/optionPage";
import LoginPage from "./pages/LoginPage/loginPage";

import PatientFormMain from "./pages/PatientFormPage/patientFormMain";
import DoctorRegisterPage1 from "./pages/DoctorRegisterPage/DoctorRegisterPage1";
import DoctorRegisterPage2 from "./pages/DoctorRegisterPage/DoctorRegisterPage2";
import PatientRegisterPage1 from "./pages/PatientRegisterPage/PatientRegisterPage1";
import PatientRegisterPage2 from "./pages/PatientRegisterPage/PatientRegisterPage2";
import DoctorDashBoard from "./pages/DoctorDashBoardPage/DoctorDashBoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/option" element={<OptionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<PatientFormMain />} />

      {/* Doctor Registration Routes */}
      <Route path="/doctor-register-1" element={<DoctorRegisterPage1 />} />
      <Route path="/doctor-register-2" element={<DoctorRegisterPage2 />} />

      {/* Patient Registration Routes */}
      <Route path="/patient-register-1" element={<PatientRegisterPage1 />} />
      <Route path="/patient-register-2" element={<PatientRegisterPage2 />} />

      {/* Doctor Profile Page */}
      <Route path="/doctor-profile" element={<DoctorDashBoard />} />
    </Routes>
  );
}

export default App;
