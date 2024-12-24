const express = require('express');
const router = express.Router();
const marksheetService = require('../service/MarksheetService');
const { isLogedInUser } = require('../middleware/authMiddleware');

router.use(isLogedInUser);

router.post('/save', (req, res) => {
    marksheetService.addMarksheet(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error('Error adding marksheet:', error);
            res.send({ error: error.message });
        });
});

router.post('/update/:id', (req, res) => {
    marksheetService.updateMarksheet(req.params.id, req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error('Error updating marksheet:', error);
            res.send({ error: error.message });
        });
});

router.post('/delete/:id', (req, res) => {
    marksheetService.deleteMarksheet(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error('Error deleting marksheet:', error);
            res.send({ error: error.message });
        });
});

router.get('/getMarksheetById/:id', (req, res) => {
    marksheetService.getMarksheetById(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error('Error fetching marksheet:', error);
            res.send({ error: error.message });
        });
});

router.get('/search', (req, res) => {
    const query = req.body;
    marksheetService.searchMarksheets(query)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error('Error searching marksheets:', error);
            res.send({ error: error.message });
        });
});

router.get('/getMeritList', (req, res) => {
    marksheetService.getMeritList()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error('Error fetching merit list:', error);
            res.send({ error: error.message });
        });
});

router.get('/findByRollNo/:rollNo', (req, res) => {
    marksheetService.findByRollNo(req.params.rollNo)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error('Error fetching marksheet by roll number:', error);
            res.send({ error: error.message });
        });
});

module.exports = router;
