const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodbUrl = process.env.MONGO_URL;

mongoose.connect(mongodbUrl)
    .then(() => {

        console.log('Connected to mongodb');

    }).catch((err) => {

        console.log('Error in MongoDB Connection' + err.message);

    })