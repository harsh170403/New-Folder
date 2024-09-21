import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Component Imports
import Header from './Admin/Header';
import Sidebar from './Admin/Sidebar';
import Home from './Admin/Home';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import ChangePasswordPage from './components/ChangePasswordPage';
import SearchPage from './components/SearchPage';
import Dashboard from './components/Dashboard';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <Home />
            </div>
          }
        />
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
