const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.get('/', function (req, res, next) {
    Post.findAll()
        .then(posts => res.send(posts))
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
  
router.post('/', function (req, res, next) {
    Post.create(req.body)
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

module.exports = router;