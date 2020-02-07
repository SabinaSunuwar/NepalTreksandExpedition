const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/users');
const agentRouter = require('./routes/agents');
const trekRouter = require('./routes/treks');
const contactRouter = require('./routes/contact');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const auth = require('./auth');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/users', userRouter);
app.use('/upload', uploadRouter);
app.use('/agents', agentRouter);
app.use('/treks', trekRouter);
app.use('/contact', contactRouter);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at localhost:${process.env.PORT}`);
});
