const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("token == ", token)
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Authorization token is missing",
            });
        }
        const validToken = JWT.verify(token, process.env.JWT_SECRET);
        req.user = validToken;  // Attach the valid token to the req object
        next();  // Call next() to pass control to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

//admin access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {

            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access'
            });

        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    requireSignIn,
    isAdmin
}
