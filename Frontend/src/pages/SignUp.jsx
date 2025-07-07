import React, { useState } from 'react'
import { signUpUser } from '../services/userService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../Style/model.css'
const SignUp = ({closeModel, openLoginModel}) => {
  const [formData, setFormData] = useState({
    userName:'',
    userEmail:'',
    userContact:'',
    userPassword:'',
    userAddress:'',
    userGender:'',
    userAge:'',
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
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <span className="auth-close-button" onClick={closeModel}>
          &times;
        </span>
        <h2>Signup To MyShop</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Enter Name"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Enter Email"
            value={formData.userEmail}
            onChange={handleChange}
          />
          <input
            type="number"
            name="userContact"
            placeholder="Enter Contact Number"
            value={formData.userContact}
            onChange={handleChange}
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Enter Password"
            value={formData.userPassword}
            onChange={handleChange}
          />
          <input
            type="text"
            name="userAddress"
            placeholder="Enter Address"
            value={formData.userAddress}
            onChange={handleChange}
          />
          <select name="userGender" value={formData.userGender} onChange={handleChange}>
            <option value=""  >Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input
            type="number"
            name="userAge"
            placeholder="Enter Age"
            value={formData.userAge}
            onChange={handleChange}
          />
          <button type="submit">Signup</button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <span
            onClick={() => {
              closeModel();
              openLoginModel();
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignUp
