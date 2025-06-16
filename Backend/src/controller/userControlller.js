const userModel = require('../models/userModel.js');
const mongoose = require('mongoose');
const { isValid, isValidName, isValidEmail, isValidPhone, isValidPassword, validGenders } = require('./validator.js')
const bcrypt = require('bcrypt');

// Add users 
const addUsers = async (req, res) => {
    try {
        let userData = req.body;
        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" })
        }

        let { userName, userEmail, userPassword, userAddress, userContact, userGender, userAge } = userData;

        // userName Validation
        if (!isValid(userName)) {
            return res.status(400).json({ msg: "UserName is Required" })
        }
        if (!isValidName(userName)) {
            return res.status(400).json({ msg: "Invalid user name" })
        }

        // userEmail Validation

        if (!isValid(userEmail)) {
            return res.status(400).json({ msg: "Email is required" })
        }
        if (!isValidEmail(userEmail)) {
            return res.status(400).json({ msg: "Invalid Email" })
        }
        // duplicate email check
        let duplicateEmail = await userModel.findOne({ userEmail });
        if (duplicateEmail) {
            return res.status(400).json({ msg: `user Emial is alreasy exist` })
        }

        //   userPassword Validation

        if (!isValid(userPassword)) {
            return res.status(400).json({ msg: "Password is required" })
        }
        if (!isValidPassword(userPassword)) {
            return res.status(400).json({ msg: "Password should be " })
        }
        // hash password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(userPassword, salt);


        // userAddress Validation

        if (!isValid(userAddress)) {
            return res.status(400).json({ msg: "User Address is required" })
        }

        // userContact Validation


        if (!isValid(userContact)) {
            return res.status(400).json({ msg: "Contact is required" })
        }
        if (!isValidPhone(userContact)) {
            return res.status(400).json({ msg: "Contact is invalid" })
        }
        let duplicatePhone = await userModel.findOne({ userContact })
        if (duplicatePhone) {
            return res.status(400).json({ msg: "user Contact is already exist" })
        }

        // userGender validation

        if (!isValid(userGender)) {
            return res.status(400).json({ msg: "Gender is required" })
        }
        if (!validGenders.includes(userGender.trim().toLowerCase())) {
            return res.json({ msg: "Invalid Gender" })
        }

        // userAge Validation
        if (userAge < 20) {
            return res.status(400).json({ msg: "Age is must be greater than 20" })
        }
        if (!isValid(userAge)) {
            return res.status(400).json({ msg: "Age is Required" })
        }

        let users = await userModel.create({
            userName,
            userEmail, 
            userContact, 
            userAddress, 
            userAge, 
            userGender, 
            userPassword: hashedPassword
        });
        return res.status(201).json({ msg: "User Added Successfully", users })

    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


// Get Users
const getUsers = async (req, res) => {
    try {
        let users = await userModel.find();

        if (users.length === 0) {
            return res.status(404).json({ msg: "User not Found" })
        }
        return res.status(200).json({ msg: "Data fetch successful", users });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error ", error })
    }
}

// Update Users
const updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let userData = req.body;

        // user Id validation
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "Invalid user Id" });
        }

        if (Object.keys(userData).length === 0) {
            return res.status(404).json({ msg: "Bad Request, Data not found" })
        }
        let { userName, userEmail, userContact, userPassword, userAddress, userGender, userAge } = userData;

        // userName Validation
        if (userName != undefined) {
            if (!isValid(userName)) {
                return res.status(400).json({ msg: "UserName is Required" })
            }
            if (!isValidName(userName)) {
                return res.status(400).json({ msg: "Invalid user name" })
            }
        }

        // userEmail Validation
        if (userEmail != undefined) {
            if (!isValid(userEmail)) {
                return res.status(400).json({ msg: "Email is required" })
            }
            if (!isValidEmail(userEmail)) {
                return res.status(400).json({ msg: "Invalid Email" })
            }
            // duplicate email check
            let duplicateEmail = await userModel.findOne({ userEmail });
            if (duplicateEmail) {
                return res.status(400).json({ msg: `user Emial is alreasy exist` })
            }
        }
        let salt;
        let hashedPassword;
        // userPassword Validation
        if (userPassword != undefined) {
            if (!isValid(userPassword)) {
                return res.status(400).json({ msg: "Password is required" })
            }
            if (!isValidPassword(userPassword)) {
                return res.status(400).json({ msg: "Invalid Password" })
            }
            // hash password
            salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(userPassword, salt);
        }


        // userAddress Validation
        if (userAddress != undefined) {
            if (!isValid(userAddress)) {
                return res.status(400).json({ msg: "User Address is required" })
            }
        }

        // user Contact Validation
        if (userContact != undefined) {
            if (!isValid(userContact)) {
                return res.status(400).json({ msg: "Contact is required" })
            }
            if (!isValidPhone(userContact)) {
                return res.status(400).json({ msg: "Contact is invalid" })
            }
            let duplicatePhone = await userModel.findOne({ userContact })
            if (duplicatePhone) {
                return res.status(400).json({ msg: "user Contact is already exist" })
            }
        }

        // userGender Validation
        if (userGender != undefined) {
            if (!isValid(userGender)) {
                return res.status(400).json({ msg: "Gender is required" })
            }
            if (!validGenders.includes(userGender.trim().toLowerCase())) {
                return res.json({ msg: "Invalid Gender" })
            }
        }

        // userAge Validation
        if (userAge != undefined) {
            if (userAge < 20) {
                return res.status(400).json({ msg: "Age is must be greater than 20" })
            }
            if (!isValid(userAge)) {
                return res.status(400).json({ msg: "Age is Required" })
            }
        }
        let updatedData = await userModel.findByIdAndUpdate(userId, 
            {userName,
            userEmail, 
            userContact, 
            userAddress, 
            userAge, 
            userGender, 
            userPassword: hashedPassword},
            { new: true })

        // 
        if(!updatedData){
            return res.status(404).json({msg:"User not found"});
        }
        return res.status(200).json({ msg: "Data Updated Successfylly", updatedData })
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error ", error })
    }
}


// delete User
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let users = req.body;

        // User Id Validation
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "Invalid user ID" });
        }

        let deletedData = await userModel.findByIdAndDelete(userId);

        if (!deletedData) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        return res.status(200).json({ msg: "User Data deleted successfully", deletedData })

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error })
    }
}

module.exports = { addUsers, getUsers, updateUser, deleteUser };