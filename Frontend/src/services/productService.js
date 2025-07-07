import axios from "./axiosConfig";

export const getAllProducts = async () => {
  return await axios.get("/getProducts");
};

export const addProduct = async (formData, config) => {
  return await axios.post("/addProducts", formData, config)
};

export const deleteProduct = async (productId) => {
  return await axios.delete(`/deleteProduct/${productId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
