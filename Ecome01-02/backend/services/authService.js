const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');  // Add this line to import JWT

const signUp = async (req, res) => {
    try {
        console.log('register data === > ', req.body)
        const { name, email, password, phone, address, answer } = req.body;
        //validation
        if (!name) {
            return res.send({ message: "name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }
        if (!phone) {
            return res.send({ message: "phone is required" });
        }
        if (!address) {
            return res.send({ message: "address is required" });
        }
        if (!answer) {
            return res.send({ message: "answer is required" });
        }

        const existingUser = await userModel.findOne({ email });
        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered, please login"
            });
        }

        // Save user
        const user = await new userModel({ name, email, phone, address, password, answer }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in User Registration",
            error
        });
    }
};

const login = async (req, res) => {
    try {
        console.log("login data === > ", req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Compare the password (plain text comparison)
        if (password !== user.password) {
            return res.status(400).send({
                success: false,
                message: "Invalid password"
            });
        }

        //genrate token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Successful login
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};


module.exports = {
    signUp,
    login
};