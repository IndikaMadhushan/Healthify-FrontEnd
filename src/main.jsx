import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import GridOverlay from './components/GridOverLay/GridOverLay.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
      
      <GridOverlay />
      <App />
      
    </BrowserRouter>
    
  </StrictMode>,
)
