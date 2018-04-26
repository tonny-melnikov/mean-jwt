const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = {
        name: req.body.name ? req.body.name : '',
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    User.addUser(newUser, (err, user) => {
        if (err) res.json({success: false, msg: 'Failed to register user...'});
        else res.json({success: true, msg: 'User registered! Now you can login!'});
    });
});

router.post('/auth', (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    User.getUserByUsername(username, (err, user) => {
        if(err) return next(err);
        if(!user) {
            return res.json({
                success: false,
                msg: 'User not found',
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) return next(err);
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secretKey, {
                    expiresIn: 604800, // 1 week
                });

                res.json({
                    success: true,
                    token: `bearer ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password',
                });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;