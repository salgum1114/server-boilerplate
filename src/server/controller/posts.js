const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('list of users');
});
  
router.get('/:id', function (req, res, next) {
    res.send('a user. id: ' + req.params.id);
});
  
router.post('/', function (req, res, next) {
    res.send('new user. name: ' + req.body.name);
});
  
router.put('/:id', function (req, res, next) {
    res.send('update a user. id: ' + req.params.id + ' , name: ' + req.body.name);
});
  
router.delete('/:id', function (req, res, next) {
    res.send('delete a user. id: ' + req.params.id);
});

module.exports = router;