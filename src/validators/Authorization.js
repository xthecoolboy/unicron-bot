const { request, response } = require('express');
const { Authorizations } = require('../options');
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {function} next 
 */
function Authorization(req, res, next) {
    const key = req.headers.authorization;
    if (key && Authorizations.includes(key)) {
        next();
    } else {
        res.status(403).send({
            message: "Not Authorizaed",
        });
    }
}

module.exports = Authorization;