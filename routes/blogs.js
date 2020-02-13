const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogs');
const router = express.Router();
const auth = require('../auth');

router.post('/addblog', (req, res, next) => {
                Blog.create({
                    name: req.body.name,
                    email: req.body.email,
                    title:req.body.title,
                    date:req.body.date,
                    blog:req.body.blog,
                    image:req.body.image
                }).then((blog) => {
                    let token = jwt.sign({ blogId: blog._id }, process.env.SECRET);
                    res.json({ status: "Blog Added Successfully!", token: token });
                }).catch(next);
            });

            router.get('/listblogs',(req,res,next)=>{
                Blog.find({},(err,blogs)=>
                {
                    if(err){
                        res.json(next)
                    }
                    res.json(blogs)
                });
            })

   
module.exports = router;