const { request, response } = require('express');
const { Admin } = require('../../database/database');

/**
 * @returns {Promise<boolean>}
 * @param {string} authorization
 */
function validateKey(authorization) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!authorization) throw { status: 400, message: 'Bad Request: No Authorization Provided' };
            const keys = await Admin.findOne({ where: { table: 'WebHook' } });
            if (!keys || !keys.data.includes(authorization)) throw { status: 403, message:'Forbidden: Invalid Authorization Key'}
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
    await validateKey(req.headers.authorization).then(() => {
        next();
    }).catch((e) => {
        console.log(e);
        if (e && e.status && e.message) res.status(e.status).send(e);
        else res.status(500).send(e.message);
        return false;
    });
}

module.exports = Authorization;