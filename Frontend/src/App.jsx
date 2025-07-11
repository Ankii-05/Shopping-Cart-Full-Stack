import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './component/Navbar';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './pages/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import './App.css'; // 👉 important to include layout styling here

function App() {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const [showSignupModel, setSignupModel] = useState(false);

  const openLoginModel = () => setShowLoginModel(true);
  const closeLoginModel = () => setShowLoginModel(false);

  const openSignupModel = () => setSignupModel(true);
  const closeSignupModel = () => setSignupModel(false);

  return (
    <>
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar openLogin={openLoginModel} />

          {showLoginModel && (
            <Login
              closeModel={closeLoginModel}
              openSignUpModel={() => {
                closeLoginModel();
                openSignupModel();
              }}
            />
          )}

          {showSignupModel && (
            <SignUp
              closeModel={closeSignupModel}
              openLoginModel={() => {
                closeSignupModel();
                openLoginModel();
              }}
            />
          )}

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addProducts" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>

      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
