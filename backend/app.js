const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routes/UserRoutes');
const studentRoute = require('./routes/StudentRoutes');
const marksheetRoute = require('./routes/MarksheetRoutes');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors());

app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    cookie: { secure: false } // Set to true if using HTTPS
}))

const PORT = 5000;

app.get('/', (req, res) => {
    res.send(`<h1 align="center">Hello Express</h1>`);
})

app.use('/user', userRoute);
app.use('/student', studentRoute);
app.use('/marksheet', marksheetRoute);

app.listen(PORT, () => {
    console.log(`APP run in this url = http://localhost:${PORT}`)
})