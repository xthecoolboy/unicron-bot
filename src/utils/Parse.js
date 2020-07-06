
const parse = require('minimist');
const builder = require('minimist-options');

/**
 * 
 * @param {Object<string, Array<string>} args Array of arguments passed to a command
 * @param {Object<string, Object<string, any>} opts Object of options to apply to the arguments array
 * @returns {Object} Parsed arguments object
 */
module.exports = function Parse(args, opts) {
    return parse(args, builder(opts));
}