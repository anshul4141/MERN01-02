const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute = require('./routes/UserRoutes');

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.get('/', (req, res) => {
    res.send(`<h1 align="center">Hello Express</h1>`);
})

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`APP run in this url = http://localhost:${PORT}`)
})