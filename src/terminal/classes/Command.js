
class Command {
    /**
     * @param {string} name
     * @param {Object<string, any>} options
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
}

module.exports = Command;