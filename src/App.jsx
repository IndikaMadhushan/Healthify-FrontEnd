
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage/HomePage";
import OptionPage from "./pages/SignupOptionPage/optionPage";
import LoginPage from "./pages/LoginPage/loginPage";


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
       <Route path="/option" element={<OptionPage/>}/> 
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  
    
  )
}

export default App
