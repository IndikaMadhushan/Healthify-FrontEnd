
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage/HomePage";
import OptionPage from "./pages/SignupOptionPage/optionPage";
import LoginPage from "./pages/LoginPage/loginPage";

import PatientFormMain from "./pages/PatientFormPage/patientFormMain";
import DoctorRegisterPage1 from "./pages/DoctorRegisterPage/DoctorRegisterPage1";
import DoctorRegisterPage2 from "./pages/DoctorRegisterPage/DoctorRegisterPage2";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
       <Route path="/option" element={<OptionPage/>}/> 
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/form" element={<PatientFormMain />}/>

      <Route path="/doctor-register-1" element={<DoctorRegisterPage1/>}/>
      <Route path="/doctor-register-2" element={<DoctorRegisterPage2/>}/>
    </Routes>
  
    
  )
}

export default App
