const express = require('express');
const router = express.Router();
const studentService = require('../service/StudentService');
const { isLogedInUser } = require('../middleware/authMiddleware');

router.use(isLogedInUser);

router.post('/save', (req, res) => {
    studentService.addStudent(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.send({ error: error.message });
        });
});

router.get('/search', (req, res) => {
    const query = req.body;
    studentService.searchStudents(query)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.send({ error: error.message });
        });
});

router.post('/delete/:id', (req, res) => {
    studentService.deleteStudent(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.send({ error: error.message });
        });
});

router.post('/update/:id', (req, res) => {
    studentService.updateStudent(req.params.id, req.body)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.send({ error: error.message });
        });
});

router.get('/getById/:id', (req, res) => {
    studentService.getStudentById(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.send({ error: error.message });
        });
});

module.exports = router;