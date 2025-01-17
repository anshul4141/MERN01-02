const express = require('express');
const { signUp } = require('../services/authService');

const router = express.Router();

router.post('/signUp', signUp);

module.exports = router;
