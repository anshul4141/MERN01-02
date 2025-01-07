const express = require('express');
const router = express.Router();
const userService = require('../service/UserService');
const { isLogedInUser } = require('../middleware/authMiddleware');

// http://localhost:5000/user/login
router.post('/login', (req, res) => {
    console.log("login data: ", req.body)
    userService.authenticate(req.body.loginId, req.body.password)
        .then(user => {
            if (!user) {
                console.log('user:1 ', user);
                throw new Error('invalid login id or password');
            }
            console.log('user: ', user);
            req.session.user = user; // set user in session
            console.log('session id ===> ', req.session.id); // print session id
            console.log('session object:', req.session); // Log the session
            res.json({
                user: user
            })
        })
        .catch(error => {
            console.log('error====>');
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

router.post('/signUp', (req, res) => {
    console.log('data: ', req.body);
    userService.addUser(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.send({ error: error.message });
        })

})


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