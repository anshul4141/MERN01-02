const express = require('express');
const { signUp, login, testApi, forgotPassword, updateProfile } = require('../services/authService');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login);

// protected route for admin only admin can access this api
router.get('/test', requireSignIn, isAdmin, testApi);

router.post('/forgot-password', forgotPassword);
router.post('/update-profile', requireSignIn, updateProfile);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

module.exports = router;
