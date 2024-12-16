const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/merndb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error in connection to MongoDB:', err.message);
    });

mongoose.connection.on('error', (err) => {
    console.error('Runtime error in MongoDB connection:', err.message);
});

module.exports = mongoose;