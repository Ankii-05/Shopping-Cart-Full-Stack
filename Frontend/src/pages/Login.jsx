import React from 'react'
import { loginUser } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import '../Style/model.css'
function Login({closeModel, openSignUpModel}) {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail:"",
    userPassword:"",
  });

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      toast.success(res.data.msg);
      localStorage.setItem("token",res.data.token);
      closeModel();
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login Failed');
    }
  }

  return(
    <div className='auth-modal-overlay'>
      <div className='auth-modal-content'>
        <span className='auth-close-button' onClick={closeModel}>&times;</span>
        <h3>Login To Shopping Cart</h3>
        <form action="" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="userEmail" 
            placeholder='Enter Email'
            value={formData.userEmail}
            onChange={handleChange}
           />
          <input 
           type="password" 
           name="userPassword" 
           placeholder='Enter Password'
           value={formData.userPassword}
           onChange={handleChange}  
          />
          <button type='submit'>Login</button>
        </form>
        <p className='auth-switch-text'>
          Don't have an account?{" "}
          <span
            style={{color:'blue', cursor:'pointer'}}
            onClick={()=>{
              closeModel();
              openSignUpModel();
            }}
          >Create an account</span>
        </p>
      </div>
    </div>
  )
}
  
export default Login
