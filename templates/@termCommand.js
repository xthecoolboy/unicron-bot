const Command = require('../classes/Command');
const Terminal = require('../Terminal');

class Help extends Command {
    constructor() {
        super('help');
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {String} content 
     * @param {Array<String>} args 
     */
    async run(terminal, content, args) {

    }
}

module.exports = Help;