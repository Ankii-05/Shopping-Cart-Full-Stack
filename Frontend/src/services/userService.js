import axios from './axiosConfig.js'


// login user
export const loginUser = async (userData) =>{
    return await axios.post('/login',userData)
}

// sign up user
export const signUpUser = async(userData)=>{
    return await axios.post('/addUsers', userData)
}


