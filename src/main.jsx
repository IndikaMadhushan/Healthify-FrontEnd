import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import MyClinicBooks from './pages/ClinicBookPage/ClinicBookCollection/MyClinicBooks.jsx';







createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
      <App />
      <MyClinicBooks/>
     
    </BrowserRouter>
    
  </StrictMode>,
)
