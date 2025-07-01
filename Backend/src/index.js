const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/routes.js")

const cors = require('cors');



let middleware1 = (req,res,next)=>{
  console.log("middleware1");
  // res.json({msg:"middleware1"})
  next();
}

// let middleware2 = (req,res,next)=>{
//   console.log("middleware2");
//   // res.json({msg:"middleware2"})
// }


const app = express();
app.use(cors())
app.use("/", router)
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ankitkushwah6195:Ankit%402003@cluster0.cuexyu3.mongodb.net/Shopping-Cart"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("DB Connection Failed"));

app.listen(4001, (err) => {
  err
    ? console.log("Server Not Connected")
    : console.log("Server is Running at port 4001");
});
