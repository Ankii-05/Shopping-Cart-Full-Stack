const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/routes.js")

const cors = require('cors');

const app = express();


let middleware1 = (req,res,next)=>{
  console.log("middleware1");
  // res.json({msg:"middleware1"})
  next();
}

// let middleware2 = (req,res,next)=>{
//   console.log("middleware2");
//   // res.json({msg:"middleware2"})
// }


app.use(cors())
app.use(express.json());
app.use("/", router)

mongoose
  .connect(
    "mongodb+srv://ankitkushwah6195:Ankit%402003@cluster0.cuexyu3.mongodb.net/Shopping-Cart"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("DB Connection Failed"));

app.listen(4001, (err) => {
  err
    ? console.log("Server Not Connected",err)
    : console.log("Server is Running at port 4001");
});
