const createError = require('http-errors');
const uuid = require('uuid').v4;

const sessionTokens = {};


module.exports.createSession = (user) => {
    const token = uuid();

    sessionTokens[token] = user;

    return token;
};

module.exports.loadSession = (token) => {
    return sessionTokens[token];
};

module.exports.auth = function(req, res, next) {
    const token = req.headers.cookie ? req.headers.cookie.split("=")[1] : req.headers.authorization;
    const user = sessionTokens[token];

    if(!user) {
        next(createError(401, 'Usuario no identificado'))
    }
    else {
        next();
    }
};

   

