/**
 * 
 * @github https://github.com/oadpoaw/lureneight
 * @author oadpoaw
 * @license MIT 
 */

/**
 * 
 * @param {number} value 
 */
function encode(value) {
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=';
    let result = '', mod;
    do {
        mod = value % 64;
        result = ALPHA.charAt(mod) + result;
        value = Math.floor(value / 64);
    } while (value > 0);
    return result;
}

/**
 * @returns {string}
 * @param {string} str 
 */
function shuffleString(str) {
    return str.split().sort(() => Math.random() - 0.5).join('');
}

/**
 * @returns {string}
 * @param {string} prefix 
 * @param {number} seed 
 */
function lureneight(prefix, seed = Date.now()) {
    if (!prefix) throw 'Prefix should be a string but gotten undefined';
    const front = Buffer.from(prefix).toString('base64');
    const middle = shuffleString(encode(seed));
    const last = shuffleString(shuffleString(Buffer.from(shuffleString((Math.random() * 0xFFFFFF).toString())).toString('base64')))
    return `${front}.${middle}.${last}`;
}

module.exports = lureneight;