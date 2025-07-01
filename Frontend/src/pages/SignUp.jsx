import React, { useState } from 'react'
import { signUpUser } from '../services/userService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const SignUp = ({closeModel, openLoginModel}) => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    contact:'',
    password:'',
    address:'',
    gender:'',
    age:'',
  });
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value});
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await signUpUser(formData);
      toast.success(res.data.msg);
      closeModel()
      openLoginModel();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Signup Failed..')
    }
  }
  return (
    <div>
      <div>
        <span onClick={closeModel}>&times;</span>
        <h3>Signup To Shopping Cart</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name='name'
            placeholder='Enter Name'
            value={formData.name}
            onChange={handleChange} 
          />
          <input 
            type="email"
            name='email'
            placeholder='Enter Email'
            value={formData.email}
            onChange={handleChange} 
          />
          <input 
            type="number"
            name='contact'
            placeholder='Enter Contact Number'
            value={formData.contact}
            onChange={handleChange} 
          />
          <input 
            type="password"
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={handleChange} 
          />
          <input 
            type="text"
            name='address'
            placeholder='Enter Address'
            value={formData.address}
            onChange={handleChange} 
          />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input 
            type="number"
            name='age'
            placeholder='Enter Age'
            value={formData.age}
            onChange={handleChange} 
          />
          <button type='submit'>Signup</button>
        </form>
        <p>Already have an account?{''}
          <span
          onClick={()=>{
            closeModel();
            openLoginModel();
          }}
          >Login</span> 
        </p>
      </div>
    </div>
  )
}

export default SignUp
