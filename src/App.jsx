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
import DoctorConsultPage from "./pages/ConsultPage/DoctorConsultPage";
import DoctorClinicBookPage from "./pages/ClinicBookPage/DoctorClinicBookPage";
import Dashboard from "./pages/PatientMainUI/Sidebar";

import RemindersPage from "./pages/Reminders/RemindersPage";


import UserProfile from "./pages/Reminders/UserProfile";
import AppointmentSection from "./pages/Reminders/AppointmentSection";
import Footer from "./components/footer";
import Header from "./pages/HomePage/Header";
import MedicineSection from "./pages/Reminders/MedicineSection";
import OtherSection from "./pages/Reminders/OtherSection";
import PeriodSection from "./pages/Reminders/PeriodSection";
import Tabs from "./pages/Reminders/Tabs";
import TodaySection from "./pages/Reminders/TodaySection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/option" element={<OptionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<PatientFormMain />} />
      <Route path="/patientMain" element={<Dashboard />} />

      <Route path="/reminders" element={<RemindersPage />} />


      {/* Reminder page
      <Route path="/Reminders" element={<UserProfile />} />
      <Route path="/Reminders" element={<AppointmentSection />} />
      <Route path="/Reminders" element={<Footer />} />
      <Route path="/Reminders" element={<Header />} />
      <Route path="/Reminders" element={<MedicineSection />} />
      <Route path="/Reminders" element={<OtherSection />} />
      <Route path="/Reminders" element={<PeriodSection />} />
      <Route path="/Reminders" element={<Tabs />} />
      <Route path="/Reminders" element={<TodaySection />} /> */}

      {/* Doctor Registration Routes */}
      <Route path="/doctor-register-1" element={<DoctorRegisterPage1 />} />
      <Route path="/doctor-register-2" element={<DoctorRegisterPage2 />} />

      {/* Patient Registration Routes */}
      <Route path="/patient-register-1" element={<PatientRegisterPage1 />} />
      <Route path="/patient-register-2" element={<PatientRegisterPage2 />} />

      {/* Doctor dashboard Page */}
      <Route path="/doctor-dashboard" element={<DoctorDashBoard />} />

      {/* Doctor Consult Page */}
      <Route
        path="/doctor-consult/:patientId"
        element={<DoctorConsultPage />}
      />

      {/* Doctor Clinic Book Page */}
      <Route
        path="/doctor-clinic-book/:patientId/:bookId"
        element={<DoctorClinicBookPage />}
      />

      <Route
        path="/patient-dashboard"
        element={<Dashboard />}
      />
    
 
    </Routes>
    
  );
}

export default App;
