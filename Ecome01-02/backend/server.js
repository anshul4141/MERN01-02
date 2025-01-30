const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

dotenv.config();

app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})


