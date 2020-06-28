
class Command {
    /**
     * @returns {this}
     * @param {String} name
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
}

module.exports = Command;