const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', function (req, res, next) {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => res.status(500).send(err));
});
  
router.get('/:id', function (req, res, next) {
    User.findOneById(req.params.id)
        .then((user) => {
            if (!user) {
               return res.json({ statusCode: 404, message: 'User not found' });
            }
            res.send(user);
        })
        .catch(err => res.status(500).send(err));
});
  
router.post('/', function (req, res, next) {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});
  
router.put('/:id', function (req, res, next) {
    User.updateById(req.params.id, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});
  
router.delete('/:id', function (req, res, next) {
    User.deleteById(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;