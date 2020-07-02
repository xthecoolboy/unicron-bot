
class Command {
    /**
     * @returns {this}
     * @param {String} name
     * @param {Object} options
     * @param {Object} options.
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
}

module.exports = Command;