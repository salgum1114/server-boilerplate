import express from 'express';

import Post from '../models/post';
import AuthController from './auth.controller';
import PostController from './posts.controller';
import UserController from './users.controller';

const router = express.Router();

const API_PREFIX = '/api';

router.get(API_PREFIX, (req, res) => {
    res.json({
        success: true,
        message: 'This API server',
    });
});
// router.use(`${API_PREFIX}/notices`, require('./notices'))
router.use(`${API_PREFIX}/auth`, AuthController);
router.use(`${API_PREFIX}/posts`, PostController);
router.use(`${API_PREFIX}/users`, UserController);

export default router;