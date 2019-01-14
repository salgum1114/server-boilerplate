import express from 'express';
import isEmpty from 'lodash/isEmpty';

import firebaseMiddleware from '../middlewares/firebaseMiddleware';
import Post from '../models/post';

const router = express.Router();

router.get('/', function (req, res, next) {
    if (!isEmpty(req.query)) {
        const { email, ...other } = req.query;
        Post.findByUser(email)
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    } else {
        Post.findAll()
            .then(posts => res.send(posts))
            .catch(err => res.status(500).send(err));
    }
});

router.get('/tags', function (req, res, next) {
    const { email, ...other } = req.query;
    Post.findTagsByUser(email)
        .then(tags => res.send(tags))
        .catch(err => res.status(500).send(err));
});
  
router.get('/:id', function (req, res, next) {
    Post.findOneById(req.params.id)
        .then((post) => {
            if (!post) {
               return res.json({ statusCode: 404, message: 'Post not found' });
            }
            res.send(post);
        })
        .catch(err => res.status(500).send(err));
});

router.use('/', firebaseMiddleware);
router.post('/', function (req, res, next) {
    Post.create({ ...req.body, ...res.locals.user })
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err));
});
  
router.put('/:id', function (req, res, next) {
    Post.updateById(req.params.id, req.body)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err));
});
  
router.delete('/:id', function (req, res, next) {
    Post.deleteById(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

export default router;