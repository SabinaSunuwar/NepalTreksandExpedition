const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/register', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            email: req.body.email,
            fullname: req.body.fullname,
            password: hash,
            conpassword: hash,
            phone: req.body.phone,
            mobile: req.body.mobile,
            address1: req.body.address1,
            address2: req.body.address2,
            address3: req.body.address3,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Registered Successfully!", token: token });
        }).catch(next);
    });
});


module.exports = router;
