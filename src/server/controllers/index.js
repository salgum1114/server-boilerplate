const express = require('express');
const Post = require('../models/post');

const router = express.Router();

const API_PREFIX = '/api';

router.get(API_PREFIX, (req, res) => {
    res.json({
        success: true,
        message: 'This API server',
    });
});
// router.use(`${API_PREFIX}/notices`, require('./notices'))
router.use(`${API_PREFIX}`, require('./auth'));
router.use(`${API_PREFIX}/posts`, require('./posts'));
router.use(`${API_PREFIX}/users`, require('./users'));

module.exports = router;