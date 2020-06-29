const { request, response } = require('express');
const { Admin } = require('../../database/database');

const ValidTables = ['WebHook', 'Bearer'];

/**
 * @returns {Promise<Boolean>}
 * @param {String} authorization
 */
function validateKey(authorization) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!authorization) throw { status: 400, message: 'Bad Request: No Authorization Provided' };
            const [table, key] = authorization.split(/ +/g);
            if (!ValidTables.includes(table)) throw { status: 400, message: 'Bad Request: Invalid Authorization Type Provided'}
            if (!key) throw { status: 400, message: 'Bad Request: Authorization Key not provided' };
            const authKeys = await Admin.findOne({ where: { table: table } });
            if (!authKeys.data.includes(key)) throw { status: 403, message: 'Forbidden: Invalid Authorization Key' };
            return resolve(true);
        } catch (e) {
            reject(e);
        }
    })
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {function} next 
 */
async function Authorization(req, res, next) { 
    await validateKey(req.headers.authorization).then((result) => {
        next();
    }).catch((e) => {
        console.log(e);
        if (e && e.status && e.message) res.status(e.status).send(e);
        else res.status(500).send(e.message);
        return false;
    });
}

module.exports = Authorization;