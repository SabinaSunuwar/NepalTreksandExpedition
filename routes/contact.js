const express = require('express');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact');
const router = express.Router();

router.post('/', (req, res, next) => {
                Contact.create({
                    name: req.body.name,
                    email: req.body.email,
                    subject:req.body.subject,
                    message:req.body.message
                }).then((contact) => {
                    let token = jwt.sign({ contactId: contact._id }, process.env.SECRET);
                    res.json({ status: "Submitted Successfully!", token: token });
                }).catch(next);
            });

   
module.exports = router;