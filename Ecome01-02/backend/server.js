const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

dotenv.config();

app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecome backend</h1>");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})


