import axios from "./axiosConfig.js";


export const getProducts = async()=>{
    return await axios.get('/getProducts');
}

