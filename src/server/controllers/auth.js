const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/login', function (req, res, next) {
    // User.getAuthenticated(req.body.userId, req.body.password, function (err, user, reason) {
        
    // });
    Post.findAll()
        .then(posts => res.send(posts))
        .catch(err => res.status(500).send(err));
});
  
router.post('/register', function (req, res, next) {
    Post.findOneById(req.params.id)
        .then((post) => {
            if (!post) {
               return res.json({ statusCode: 404, message: 'Post not found' });
            }
            res.send(post);
        })
        .catch(err => res.status(500).send(err));
});
  
router.post('/find', function (req, res, next) {
    Post.create(req.body)
        .then(post => res.send(post))
        .catch(err => res.status(500).send(err));
});
  
module.exports = router;