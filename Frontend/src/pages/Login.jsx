import React from 'react'
import { loginUser } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
function Login({closeModel, openSignUpModel}) {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",
    password:"",
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
    <div>
      <div>
        <span onClick={closeModel}>&times;</span>
        <h3>Login To Shopping Cart</h3>
        <form action="" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            placeholder='Enter Email'
            value={formData.email}
            onChange={handleChange}
           />
          <input 
           type="password" 
           name="password" 
           placeholder='Enter Password'
           value={formData.password}
           onChange={handleChange}  
          />
          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span
            // style={{color:'blue', cursor:'pointer'}}
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
