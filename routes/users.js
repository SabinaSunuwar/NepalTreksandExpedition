const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user != null) {
                let err = new Error('Email already exists!');
                err.status = 401;
                return next(err);
            }

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    throw new Error('Could not encrypt password!');
                }
                User.create({
                    email: req.body.email,
                    fullname: req.body.fullname,
                    password:hash,
                    conpassword: hash,
                    phone:req.body.phone,
                    mobile:req.body.mobile,
                    address1:req.body.address1,
                    address2: req.body.address2,
                    image:req.body.image
                }).then((user) => {
                    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                    res.json({ status: "Signup Success!", token: token });
                }).catch(next);
            });
        });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function (err, status) {
                if (!status) {
                    let err = new Error('Password does not match!');
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                res.json({ status: 'Login Successful!', token:token});
            });
        }).catch((err)=>{
            next()
        });
});

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json(req.user);
});



router.put('/update', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({status: 'Profile Updated!', user:user});
        }).catch(next);
});
                                                                                                         
router.delete('/delete', auth.verifyUser, (req, res, next) => {
    User.findByIdAndDelete(req.user._id)
        .then((user) => {
            res.json({ status: 'User deleted!', user: user })
        }).catch(next);
});
module.exports = router;
