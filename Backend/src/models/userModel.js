let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    userPassword:{
        type:String,
        required:true,
        trim:true,
    },
    userAddress:{
        type:String,
        required:true,
        trim:true,
    },
    userContact:{
        type:Number,
        required:true,
        unique:true,
    },
    userGender:{
        type:String,
        required:true,
        enum:['male','female','other'],
        lowercase:true,
    },
    userAge:{
        type:Number,
        required:true,
    },
},
{
    timestamps:true,
});

module.exports = new mongoose.model("user-Schema", userSchema);

