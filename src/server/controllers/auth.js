const express = require('express');
const admin = require('firebase-admin');

const User = require('../models/user');

const router = express.Router();

router.post('/register', function (req, res, next) {
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        displayName: req.body.displayName,
    })
    .then((user) => {
        User.create({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            phoneNumber: user.phoneNumber,
            providerId: user.providerId,
            bio: req.body.bio,
            role: 'user',
        }).then(createdUser => res.send(createdUser));
        // admin.app().database().ref('users').child(user.uid).set({
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoUrl: user.photoURL,
        //     phoneNumber: user.phoneNumber,
        //     providerId: user.providerId,
        //     bio: req.body.bio,
        // }).then((response) => {
        //     res.send(user);
        // });
    })
    .catch((err) => {
        if (err.code === 'auth/email-already-exists') {
            admin.auth().getUserByEmail(req.body.email).then((user) => {
                User.findOneByEmail(req.body.email).then((findUser) => {
                    if (!findUser) {
                        const Admin = {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            photoUrl: user.photoURL,
                            phoneNumber: user.phoneNumber,
                            providerId: user.providerId,
                            bio: req.body.bio,
                            role: 'user',
                        };
                        User.create(Admin).then(createdUser => res.send(createdUser));
                    } else {
                        res.status(500).send('auth/email-already-exists');
                    }
                }).catch((e) => {
                    res.status(500).send(e);
                });
            });
        } else {
            res.status(500).send(err);
        }
    });
});
  
router.post('/find', function (req, res, next) {
    Post.create(req.body)
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
});

module.exports = router;