
const crypto = require('crypto');

module.exports = function (options = {}) {
    return crypto.createHmac(options.hash, options.salt)
        .update(options.text)
        .digest('hex');
}