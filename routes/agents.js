const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agents');
const router = express.Router();

router.post('/register', (req, res, next) => {
    Agent.findOne({ email: req.body.email })
        .then((agent) => {
            if (agent != null) {
                let err = new Error('Email already exists!');
                err.status = 401;
                return next(err);
            }

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    throw new Error('Could not encrypt password!');
                }
                Agent.create({
                    email: req.body.email,
                    company: req.body.company,
                    password:hash,
                    conpassword: hash,
                    contact:req.body.contact,
                    phone:req.body.phone,
                    image:req.body.image
                }).then((agent) => {
                    let token = jwt.sign({ agentId: agent._id }, process.env.SECRET);
                    res.json({ status: "Signup Success!", token: token });
                }).catch(next);
            });
        });
});

router.post('/login', (req, res, next) => {
    Agent.findOne({ email: req.body.email })
        .then((agent) => {
            if (agent === null) {
                let err = new Error('Agent not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, agent.password, function (err, status) {
                if (!status) {
                    let err = new Error('Password does not match!');
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({ agentId: agent._id }, process.env.SECRET);
                res.json({ status: 'Login Successful!', token: token });
            });
        }).catch(next);
});


module.exports = router;
