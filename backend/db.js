const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/merndb')
    .then(() => {

        console.log('Connected to mongodb');

    }).catch((err) => {

        console.log('Error in MongoDB Connection' + err.message);

    })

