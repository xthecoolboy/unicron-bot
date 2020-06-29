
const crypto = require('crypto');

module.exports = function (options = {}) {
    return crypto.createHmac(options.hash)
        .update(options.salt ? options.salt + options.text + options.salt : options.text)
        .digest('hex');
}