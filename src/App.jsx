import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import OptionPage from "./pages/SignupOptionPage/optionPage";
import LoginPage from "./pages/LoginPage/loginPage";
import DoctorRegisterPage1 from "./pages/DoctorRegisterPage/DoctorRegisterPage1";
import DoctorRegisterPage2 from "./pages/DoctorRegisterPage/DoctorRegisterPage2";
import PatientRegisterPage1 from "./pages/PatientRegisterPage/PatientRegisterPage1";
import PatientRegisterPage2 from "./pages/PatientRegisterPage/PatientRegisterPage2";
import DoctorDashBoardPage from "./pages/DoctorDashBoardPage/DoctorDashBoardPage";
import DoctorConsultPage from "./pages/ConsultPage/DoctorConsultPage";
import DoctorClinicBookPage from "./pages/ClinicBookPage/DoctorClinicBookPage";
import Dashboard from "./pages/PatientMainUI/Sidebar";
import PatientFormDoctorView from "./pages/PatientFormPage/patientFormDoctorView";
import PatientFirstFillForm from "./pages/PatientFormPage/PatientFirstFillForm";

import RemindersPage from "./pages/Reminders/RemindersPage";

import MedicalReportsPage from "./pages/MedicalReportsPage/MedicalReportsPage";

//
import VerifyOtpPage from "./pages/Auth/VerifyOtpPage";
import PrescriptionVerify from "./pages/Prescriptions/PrescriptionVerify";
import PrescriptionList from "./pages/Prescriptions/PrescriptionList";
import SurgeryHistory from "./pages/SurgeryFolder/SurgeryHistory";
import SurgeryCardFolder from "./pages/SurgeryFolder/SurgeryCardFolder";

import AboutUs from "./pages/QuickLinks/AboutUs";
import FrequentlyAskedQuestions from "./pages/QuickLinks/FrequentlyAskedQuestions";
import PrivacyPolicy from "./pages/QuickLinks/PrivacyPolicy";
import TermsAndConditions from "./pages/QuickLinks/TermsAndConditions";
import { Toaster } from "react-hot-toast";





//test
import CustomizeFolder from "./pages/RepoteManagePages/CustomizeFolderPage";
import Uploader from "./pages/RepoteManagePages/reportUploadComponent";
import VaccinePage from "./pages/RepoteManagePages/VaccinePage";
import AllDoctorNotes from "./pages/AllDoctorNotes/AllDoctorNotes";

function App() {
  return (
  <>
  <Toaster position="top-right" reverseOrder={false} /> 
    <Routes>
      <Route path="/customize-folders" element={<CustomizeFolder />} />
      <Route path="/report-upload" element={<Uploader />} />
      <Route path="/vaccine-page" element={<VaccinePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/option" element={<OptionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/doctorViewform" element={<PatientFormDoctorView />} />

      <Route path="/firstFillForm" element={<PatientFirstFillForm/> } />

    

      <Route path="/patientMain" element={<Dashboard />} />

      <Route path="/reminders" element={<RemindersPage />} />


      
      <Route path="/verify-otp" element={<VerifyOtpPage />} />



      {/* Doctor Registration Routes */}
      <Route path="/doctor-register-1" element={<DoctorRegisterPage1 />} />
      <Route path="/doctor-register-2" element={<DoctorRegisterPage2 />} />
      {/* Patient Registration Routes */}
      <Route path="/patient-register-1" element={<PatientRegisterPage1 />} />
      <Route path="/patient-register-2" element={<PatientRegisterPage2 />} />

      <Route path="/patient-dashboard" element={<Dashboard />} />

      {/* Quick Links */}
      <Route path="/aboutUs" element={<AboutUs/>}/>
      <Route path="/faq" element={<FrequentlyAskedQuestions/>}/>
      <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
      <Route path="/termsandConditions" element={<TermsAndConditions/>}/>


      

      {/* Doctor dashboard Page */}
      <Route path="/doctor-dashboard" element={<DoctorDashBoardPage />} />

      {/* Doctor Consult Page */}
      <Route
        path="/doctor-consult/:patientId"
        element={<DoctorConsultPage />}
      />

      <Route path="/medical-reports" element={<MedicalReportsPage />} />

      {/* http://localhost:5173/doctor-clinic-book/:UR5678/:CB001 */}
      {/* Doctor Clinic Book Page */}
      <Route
        path="/doctor-clinic-book/:patientId/:bookId"
        element={<DoctorClinicBookPage />}
      />

      <Route path="/patient-dashboard" element={<Dashboard />} />
      <Route path="/prescription" element={<PrescriptionList />} />
      <Route path="/verify/:id" element={<PrescriptionVerify />} />

      <Route path="/surgeries" element={<SurgeryHistory />} />
      <Route path="/surgery/:pid/:id" element={<SurgeryCardFolder />} />
      {/* Doctor Notes Page */}
      <Route path="/doctor-notes" element={<AllDoctorNotes />} />
    </Routes>
  </>
  );
}

export default App;
