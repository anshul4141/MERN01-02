const express = require('express');
const router = express.Router();
const userService = require('../service/UserService');

const isLogedInUser = (req, res, next) => {
    if (req.session.user) {

        next();

    } else {
        res.status(401).json({ message: 'user Unauthorized' });
    }
}

router.post('/login', (req, res) => {
    console.log("login data: ", req.body)
    userService.authenticate(req.body.loginId, req.body.password)
        .then(user => {
            req.session.user = user; // set session when user login
            console.log('session id =====> ', req.session.id);
            res.json({
                message: 'User Login Successfully',
                user: user
            })
        })
        .catch(error => {
            res.send({ error: error.message });
        })

})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Logout failed' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

router.use(isLogedInUser);

router.post('/save', (req, res) => {
    console.log('data: ', req.body);
    userService.addUser(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: error.message });
        })

})

router.post('/update/:id', (req, res) => {

    console.log("id: ", req.params.id);
    userService.updateUser(req.params.id, req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: 'user not found' });
        })

})

router.post('/delete/:id', (req, res) => {

    console.log("id: ", req.params.id);
    userService.deleteUser(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: 'user not found' });
        })

})

router.get('/getById/:id', (req, res) => {

    console.log("id: ", req.params.id);
    userService.getUserById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: 'user not found' });
        })

})

router.get('/search', (req, res) => {

    console.log("search data = ", req.body);
    const query = req.body;

    userService.searchUsers(query)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: 'user not found' });
        })
})

router.get('/findByLoginId', (req, res) => {
    console.log("loginId = ", req.body);
    userService.findByLoginId(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: 'user not found' });
        })
})

module.exports = router;