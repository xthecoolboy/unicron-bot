const Command = require('../classes/Command');
const Terminal = require('../Terminal');

class Help extends Command {
    constructor() {
        super('help');
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} content 
     * @param {Array<string>} args 
     */
    async run(terminal, content, args) {
        console.log(`
Commands:
\teco - Economy manager (Coins)
\t\t- eco add <Snowflake> <amount>
\t\t- eco remove <Snowflake> <amount>
\t\t- eco show <Snowflake>
\tauth - Authorization
\t\t- auth revoke <Table> <Token>
\t\t- auth regenerate <Table> <Amount> [--force](Forcefully create a new table if not exist)
\t\t- auth list <Table>
\t\t- auth all (List all valid tables)
        `)
    }
}

module.exports = Help;