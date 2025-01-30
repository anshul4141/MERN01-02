const express = require('express');
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');
const {
    addCategory,
    updateCategory,
    searchCetegory,
    deleteCategory,
    getCategory
} = require('../services/categoryService');

const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, addCategory);

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategory);

router.get('/get-categories', getCategory);

router.get('/get-category/:slug', searchCetegory);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategory);

module.exports = router;