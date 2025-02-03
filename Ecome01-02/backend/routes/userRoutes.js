const express = require('express');
const { addUser, searchUser, deleteUser, updateUser } = require("../services/userService");
const { requireSignIn } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/addUser', requireSignIn, addUser);

router.get('/searchUser', requireSignIn, searchUser);

router.delete('/deleteUser/:id', requireSignIn, deleteUser);

router.put('/updateUser/:id', requireSignIn, updateUser);

module.exports = router;