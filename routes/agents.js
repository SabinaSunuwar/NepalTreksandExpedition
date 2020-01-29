const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agents');
const router = express.Router();

router.post('/register', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        Agent.create({
            email: req.body.email,
            company: req.body.company,
            password: hash,
            conpassword: hash,
            contact: req.body.contact,
            phone: req.body.phone
        }).then((agent) => {
            let token = jwt.sign({ _id: agent._id }, process.env.SECRET);
            res.json({ status: "Registered Successfully!", token: token });
        }).catch(next);
    });
});

router.post('/register', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        Agent.create({
            email: req.body.email,
            company: req.body.company,
            password: hash,
            conpassword: hash,
            contact: req.body.contact,
            phone: req.body.phone
        }).then((agent) => {
            let token = jwt.sign({ _id: agent._id }, process.env.SECRET);
            res.json({ status: "Registered Successfully!", token: token });
        }).catch(next);
    });
});

module.exports = router;
