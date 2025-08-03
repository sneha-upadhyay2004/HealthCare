
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css'

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { AuthProvider } from './context/AuthContext';
import CallPage from './pages/Call'
import VideoComponent from './pages/VideoComponent';
import SendForSelfForm from './pages/SendForSelf';
import SendForOthersForm from './pages/SendForOthers';
import LandingPage from './pages/SosLanding';
import AllEmergencies from './pages/AllEmergencies';
import HospitalPage from './pages/HospitalPage'



createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <AuthProvider>
  <Routes>
     {/* <Route path='/' element={< LandingPage/>}/> */}
    
    <Route path='/Call' element={< CallPage/>}/>
     <Route path='/:url' element={< VideoComponent/>} />
     <Route path="/self" element={<SendForSelfForm />} />
        <Route path="/others" element={<SendForOthersForm />} />
         <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/emergencies" element={<AllEmergencies />} />
        <Route path="/hospital" element={< HospitalPage />} />
       
        
  </Routes>
  </AuthProvider>
  </BrowserRouter>
)
