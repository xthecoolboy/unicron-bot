
const parse = require('minimist');
const builder = require('minimist-options');

/**
 * @function Parse
 * @param {Object.<Array<String>>} args Array of arguments passed to a command
 * @param {Object.<String, Any} opts Object of options to apply to the arguments array
 * @returns {Object} Parsed arguments object
 */
module.exports = function Parse(args, opts) {
    return parse(args, builder(opts));
}