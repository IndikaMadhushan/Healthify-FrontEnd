import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import PatientFormDoctorView from "./pages/PatientFormPage/PatientFormDoctorView";
import PatientFirstFillForm from "./pages/PatientFormPage/PatientFirstFillForm";
import RemindersPage from "./pages/Reminders/RemindersPage";
import MedicalReportsPage from "./pages/MedicalReportsPage/MedicalReportsPage";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import VerifyOtpPage from "./pages/Auth/VerifyOtpPage";
import PrescriptionVerify from "./pages/Prescriptions/PrescriptionVerify";
import PrescriptionList from "./pages/Prescriptions/PrescriptionList";
import SurgeryHistory from "./pages/SurgeryFolder/SurgeryHistory";
import SurgeryCardFolder from "./pages/SurgeryFolder/SurgeryCardFolder";

// Quick Links
import AboutUs from "./pages/QuickLinks/AboutUs";
import ContactUs from "./pages/QuickLinks/ContactUs";
import FrequentlyAskedQuestions from "./pages/QuickLinks/FrequentlyAskedQuestions";
import PrivacyPolicy from "./pages/QuickLinks/PrivacyPolicy";
import TermsAndConditions from "./pages/QuickLinks/TermsAndConditions";
import Test from "./pages/QuickLinks/Test";

import { Toaster } from "react-hot-toast";

//test
import CustomizeFolder from "./pages/RepoteManagePages/CustomizeFolderPage";
import Uploader from "./pages/RepoteManagePages/reportUploadComponent";
import VaccinePage from "./pages/RepoteManagePages/VaccinePage";
import AllDoctorNotes from "./pages/AllDoctorNotes/AllDoctorNotes";
import ForgotPasswordPage from "./pages/PasswordReset/ForgotPasswordPage";
import ResetPasswordPage from "./pages/PasswordReset/ResetPasswordPage";
import PatientLayout from "./layouts/PatientLayout";
import MyProfile from "./pages/PatientMainUI/PatientProfilePage";
// import { Navigate } from "react-router-dom";
import DoctorLayout from "./layouts/DoctorLayout";

import PrescriptionPage from "./pages/Prescriptions/PrescriptionPage";
import DoctorNotePage from "./pages/AllDoctorNotes/DoctorNotePage";
import SurgeryPage from "./pages/SurgeryFolder/SurgeryPage";
import InsideSurgeryFolder from "./pages/SurgeryFolder/InsideSurgeryFolder";
import ClinicBookPage from "./pages/ClinicBookPage/ClinicBookCollection/ClinicBookPage";
import ClinicPrescriptionList from "./pages/ClinicBookPage/ClinicBookPrescriptionPage/ClinicPrescriptionList";
import ClinicBookPrescriptionPage from "./pages/ClinicBookPage/ClinicBookPrescriptionPage/ClinicBookPrescriptionPage";
import RouteTransition from "./components/RouteTransition";
import LabReportsPage from "./pages/MedicalReportsPage/LabReportsPage";
import DoctorProfile from "./pages/DoctorMainUI/DoctorProfile";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
          },
          success: {
            style: {
              background: "#10b981",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          },
        }}
      />

      <RouteTransition>
        <Routes>
          <Route path="lab-reports" element={<LabReportsPage />} />
          {/* Legacy patient dashboard redirect
      <Route
        path="/patient-dashboard"
        element={<Navigate to="/patient/dashboard" replace />}
      /> */}

          {/* PATIENT AREA */}
          <Route path="/patient" element={<PatientLayout />}>
            {/* Main patient dashboard (sidebar-based UI) */}
            <Route path="medical-reports" element={<Dashboard />}>
              <Route path="prescriptions" element={<PrescriptionPage />} />
              <Route path="clinic-book" element={<ClinicBookPage />} />
              <Route path="lab-reports" element={<LabReportsPage />} />
              <Route
                path="clinic-book/:clinicBookId/pages"
                element={<ClinicBookPrescriptionPage />}
              />
              <Route path="surgeries" element={<SurgeryPage />} />
              <Route
                path="surgeries/:surgeryId"
                element={<InsideSurgeryFolder />}
              />
              <Route path="drnote" element={<DoctorNotePage />} />
            </Route>
            {/* Profile */}
            {/* <Route path="profile" element={<MyProfile />} /> */}

            {/* Reminders */}
            <Route path="reminders" element={<RemindersPage />} />

            {/* Medical records */}
            {/* <Route path="medical-reports" element={<MedicalReportsPage />} /> */}
            <Route path="prescription" element={<PrescriptionList />} />
            <Route path="surgeries" element={<SurgeryHistory />} />

            {/* Forms */}
            <Route path="firstFillForm" element={<PatientFirstFillForm />} />
          </Route>
          <Route path="/customize-folders" element={<CustomizeFolder />} />
          <Route path="/report-upload" element={<Uploader />} />
          <Route path="/vaccine-page" element={<VaccinePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/option" element={<OptionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* <Route path="/doctorViewform" element={<PatientFormDoctorView />} /> */}
          <Route path="/firstFillForm" element={<PatientFirstFillForm />} />
          <Route path="/patientMain" element={<Dashboard />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          {/* Doctor Registration Routes */}
          <Route path="/doctor-register-1" element={<DoctorRegisterPage1 />} />
          <Route path="/doctor-register-2" element={<DoctorRegisterPage2 />} />
          {/* Patient Registration Routes */}
          <Route
            path="/patient-register-1"
            element={<PatientRegisterPage1 />}
          />
          <Route
            path="/patient-register-2"
            element={<PatientRegisterPage2 />}
          />
          {/* <Route path="/patient-dashboard" element={<Dashboard />} /> */}
          {/* Quick Links */}
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />

          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandConditions" element={<TermsAndConditions />} />
          <Route path="/test" element={<Test/>}/>

          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DoctorDashBoardPage />} />
            <Route path="doctor-profile" element={<DoctorProfile/>} />
            <Route path=":patientId/consult" element={<DoctorConsultPage />} />
            {/* <Route path="profile" element={<DoctorProfile />} /> */}
            <Route
              path=":patientId/doctorViewform"
              element={<PatientFormDoctorView />}
            />

            <Route path=":patientId/profile" element={<MyProfile />} />
            <Route
              path=":patientId/medical-reports"
              element={<MedicalReportsPage />}
            >
              <Route path="prescriptions" element={<PrescriptionPage />} />
              <Route path="clinic-book" element={<ClinicBookPage />} />
              <Route path="lab-reports" element={<LabReportsPage />} />
              <Route
                path="clinic-book/:clinicBookId/clinicpage"
                element={<DoctorClinicBookPage />}
              />
              <Route
                path="clinic-book/:clinicBookId/pages"
                element={<ClinicBookPrescriptionPage />}
              />
              <Route path="surgeries" element={<SurgeryPage />}>
                <Route path=":surgeryId" element={<InsideSurgeryFolder />} />
              </Route>
              <Route path="drnote" element={<DoctorNotePage />} />
              {/* <Route path="reports" element={<ReportsPage />} /> */}
            </Route>
          </Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Doctor Consult Page */}
          {/* <Route
            path="/doctor-consult/:patientId"
            element={<DoctorConsultPage />}
          /> */}
          {/* <Route path="/medical-reports" element={<MedicalReportsPage />} /> */}
          {/* http://localhost:5173/doctor-clinic-book/:UR5678/:CB001 */}
          {/* Doctor Clinic Book Page */}
          {/* <Route
            path="/doctor-clinic-book/:patientId/:bookId"
            element={<DoctorClinicBookPage />}
          /> */}
          {/* <Route path="/patient-dashboard" element={<Dashboard />} />
          <Route path="/prescription" element={<PrescriptionList />} />
          <Route path="/verify/:clinicPageId" element={<PrescriptionVerify />} />
          <Route path="/surgeries" element={<SurgeryHistory />} />
          <Route path="/surgery/:id" element={<InsideSurgeryFolder />} />
          {/* Doctor Notes Page */}
          {/* <Route path="/doctor-notes" element={<AllDoctorNotes />} />
          
          <Route path="/medical-reports/surgeries" element={<SurgeryPage />} /> */}
          {/* <Route
            path="/medical-reports/prescriptions"
            element={<PrescriptionPage />}
          /> */}
          {/* <Route
            path="/medical-reports/drnote"
            element={<DoctorNotePage />}
          />
          <Route
            path="/medical-reports/clinic-book"
            element={<ClinicBookPage />}
          /> */}
          {/* <Route path="/clinic-book/:id/pages" element={ <ClinicPrescriptionList/>  } /> */}
          {/* <Route path="/clinic-book/:clinicBookId/pages"element={<ClinicBookPrescriptionPage />}/> */}
        </Routes>
      </RouteTransition>
    </>
  );
}

export default App;
