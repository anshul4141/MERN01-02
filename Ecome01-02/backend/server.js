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

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})


