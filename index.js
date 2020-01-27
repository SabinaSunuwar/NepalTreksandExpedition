const express = require('express');
const mongoose = require('mongoose');

const app = new express();



const url = 'mongodb://localhost:27017/NepalTreksandExpedition';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

connect.then((db) => {
    console.log("Connected to mongodb server");
}, (err) => {console.log(err); });

const uploadRouter = require('./routes/upload');

app.use('/upload', uploadRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(3000,'localhost',()=>{
    console.log("Server started at 3000")
})
