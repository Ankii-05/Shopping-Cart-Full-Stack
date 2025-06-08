let mongoose = require('mongoose');
let express = require('express');


let app = express();
app.use(express.json());

const router = require('./routes/routes.js')
app.use('/',router);

// MongoDB Connection 
mongoose.connect(`mongodb+srv://ankitkushwah6195:Ankit%402003@cluster0.cuexyu3.mongodb.net/Shopping-Cart`)
.then(()=> console.log(`Database connected successfully`))
.catch(()=> console.log(`Database not connected`))


// Server creation
let PORT = 4001
app.listen(PORT, (err)=> err?  console.log(err) : console.log(`Server is running at ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Hello from server")
})


