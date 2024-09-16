import React, { } from 'react';
import './App.css';
  
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
  
import LandingPage from "./Pages/LandingPage";
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
 
function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
      <h1 className="page-header text-center">React and Python Flask Login Register</h1>
   
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
   
export default App;