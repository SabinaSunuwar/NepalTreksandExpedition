const express = require('express');
const jwt = require('jsonwebtoken');
const Trek = require('../models/treks');
const router = express.Router();
const agentauth = require('../agentauth');

router.post('/addtrek', (req, res, next) => {
                Trek.create({
                    name: req.body.name,
                    days: req.body.days,
                    price:req.body.price,
                    itinerary:req.body.itinerary,
                    image:req.body.image
                }).then((trek) => {
                    let token = jwt.sign({ trekId: trek._id }, process.env.SECRET);
                    res.json({ status: "Trek Added Successfully!", token: token });
                }).catch(next);
            });

            router.get('/treks',(req,res,next)=>{
                Trek.find({},(err,treks)=>
                {
                    if(err){
                        res.json(next)
                    }
                    res.json(treks)
                });
            })

   
module.exports = router;