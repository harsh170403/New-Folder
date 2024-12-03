import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Component Imports
import Header from './Admin/Header';
import Sidebar from './Admin/Sidebar';
import Home from './Admin/Home';
import OrdersCustomersManager from './Admin/OrdersCustomersManager'; // Import OrdersCustomersManager
import ShopItemsManager from './Admin/ShopItemsManager'; // Import ShopItemsManager

// User Components
import User_header from './user_dashboard/User_header';
import User_sidebar from './user_dashboard/User_sidebar';
import User_home from './user_dashboard/User_home';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import ChangePasswordPage from './components/ChangePasswordPage';
import SearchPage from './components/SearchPage';
import HomePageCard from './components/HomePageCard';
import Product from './components/Product';
import ProductPage from './components/ProductPage';
import PaymentForm from "./components/PaymentForm";


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
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
        <Route
          path="/admin/orders-customers"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <OrdersCustomersManager />
            </div>
          }
        />
        <Route
          path="/admin/shop-items"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <ShopItemsManager />
            </div>
          }
        />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <div className="grid-container">
              <User_header OpenSidebar={OpenSidebar} />
              <User_sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <User_home />
            </div>
          }
        />
        
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/HomePageCard" element={< HomePageCard/>} />
        <Route path="/Payment" element={< PaymentForm/>} />




        
      </Routes>
    </Router>
  );
}

export default App;
