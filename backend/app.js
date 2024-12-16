const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`);
})

app.listen(PORT, () => {
    console.log(`Server is running on ====>> http://localhost:${PORT}`);
})