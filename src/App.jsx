
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import DoctorRegisterPage from "./pages/register/doctorRegisterPage";
import PatientRegisterPage from "./pages/register/patientRegisterPage";
import OptionPage from "./pages/register/optionPage";

// Dashboard Pages
import DoctorDashboardPage from "./pages/doctorDashboardPage";
import PatientDashboardPage from "./pages/patientDashboardPage";

// Clinic + File Upload
import ClinicBookPage from "./pages/clinicBookPage";
import FileUploadMainPage from "./pages/fileUploadMainPage";

// Reminder Pages
import AppointmentRemindPage from "./pages/reminder/appointmentRemindPage";
import MedicineRemindPage from "./pages/reminder/medicineRemindPage";
import OtherRemindPage from "./pages/reminder/otherRemindPage";
import PeriodRemindPage from "./pages/reminder/periodRemindPage";
import TodayRemindPage from "./pages/reminder/todayRemindPage";

// Patient Consultation
import PatientConsultationPage from "./pages/patientConsultationPage";

import './App.css'
import PageNotFoundPage from "./pages/pageNotFoundPage";

function App() {
  

  return (
  
 
      <Routes>
        {/* MAIN PAGES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* REGISTER PAGES */}
        <Route path="/register/doctor" element={<DoctorRegisterPage />} />
        <Route path="/register/patient" element={<PatientRegisterPage />} />
        <Route path="/register/options" element={<OptionPage />} />

        {/* DASHBOARDS */}
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/patient/dashboard" element={<PatientDashboardPage />} />

        {/* CLINIC / FILE UPLOAD */}
        <Route path="/clinic-book" element={<ClinicBookPage />} />
        <Route path="/file-upload" element={<FileUploadMainPage />} />

        {/* REMINDERS */}
        <Route path="/reminder/today" element={<TodayRemindPage />} />
        <Route path="/reminder/appointment" element={<AppointmentRemindPage />} />
        <Route path="/reminder/medicine" element={<MedicineRemindPage />} />
        <Route path="/reminder/period" element={<PeriodRemindPage />} />
        <Route path="/reminder/other" element={<OtherRemindPage />} />

        {/* CONSULTATION PAGE */}
        <Route path="/consultation" element={<PatientConsultationPage />} />

        {/* page not found*/}
        <Route path="/*" element={<PageNotFoundPage/>} />
      </Routes>
  
    
  )
}

export default App
