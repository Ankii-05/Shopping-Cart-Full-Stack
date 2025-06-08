const express = require('express');

const router = express.Router();

const {addUsers, getUsers, updateUser, deleteUser} = require('../controller/userControlller.js');

router.post('/addUsers', addUsers);
router.get('/getUsers', getUsers);
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;