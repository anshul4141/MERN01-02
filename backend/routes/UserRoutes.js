const express = require('express');
const router = express.Router();
const userService = require('../service/UserService');

router.post('/save', (req, res) => {
    userService.addUser(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.log('error : ', error.message);
            res.status(500).json({ error: error.message })
        });
})

router.post('/update/:id', (req, res) => {
    console.log('id: ', req.params.id);
    console.log('data: ', req.body);
    userService.updateUser(req.params.id, req.body)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.post('/delete/:id', (req, res) => {
    userService.deleteUser(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;