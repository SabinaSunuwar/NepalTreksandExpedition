const jwt = require('jsonwebtoken');
const User = require('./models/treks');

module.exports.verifyAgent = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Auth.findById(data._id)
        .then((auth) => {
            req.auth = auth;
            next();
        })
}
