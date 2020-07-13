const Command = require('../classes/Command');
const Terminal = require('../Terminal');
const { Admin } = require('../../database/database');
const lureneight = require('../../utils/lureneight');

class Help extends Command {
    constructor() {
        super('auth');
        this.authTypes = [
            'WebHook',
            'UserAPI',
            'GuildAPI',
            'Dashboard',
        ]
    }
    /**
     * @returns {string}
     * @param {Terminal} terminal 
     */
    createHash(terminal) {
        return lureneight(terminal.utils.Random.string(17));
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} content 
     * @param {Array<string>} args 
     */
    async run(terminal, content, args) {
        const [action, table, ...value] = args;
        try {
            if (!action) throw { message: 'No Action?' };
            if (!table && action !== 'all') throw { message: 'No table?' };
            switch (action) {
                case 'add': {
                    if (!value[0]) throw { message: 'No Key?' };
                    this.add(table, value[0]);
                    break;
                }
                case 'revoke': {
                    if (!value[0]) throw { message: 'No Key?' };
                    this.revoke(terminal, table, value[0]).catch((e) => { throw e });
                    break;
                }
                case 'regenerate': {
                    const amount = (value[0] && !isNaN(value[0])) ? Number(value[0]) : 1;
                    const force = value[1] && value[1] === '--force';
                    this.regenerate(terminal, table, amount, force).catch((e) => { throw e });
                    break;
                }
                case 'list': {
                    const keys = await Admin.findOne({ where: { table: table } });
                    if (!keys) return console.log('No such table :P');
                    console.log(keys.data);
                    break;
                }
                case 'all': {
                    const tables = await Admin.findAll();
                    console.log(tables.filter((t) => this.authTypes.includes(t.table)).map((t) => t.table).join(', '));
                    break;
                }
                default: {
                    throw { message: 'Invalid Sub Command' };
                }
            }
        } catch (e) {
            terminal.logger.error(e.message, 'Terminal');
        }
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} table 
     * @param {string} token 
     */
    async add(table, token) {
        if (!token) throw { message: 'No such token' };
        const keys = await Admin.findOne({ where: { table } });
        if (!keys) throw { message: 'No such table' };
        if (keys.data.includes(token)) throw { message: 'Token already exists in the database' };
        keys.data.push(token);
        await keys.save();
        console.log(`Token added to table ${table}`);
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} table 
     * @param {string} token 
     * @var {Array<string>} tokens
     */
    async revoke(terminal, table, token) {
        if (!token) throw { message: 'No such token' };

        const keys = await Admin.findOne({ where: { table } });
        if (!keys) throw { message: 'No such table' };
        if (!keys.data.includes(token)) throw { message: 'No such token in the database' };

        const data = keys.data.filter((str) => str !== token);
        await Admin.update({ data }, { where: { table } });

        console.log(`Token ${token.slice(0,12)}... has been revoked!`);
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} table 
     * @param {number} amount 
     * @param {boolean} force
     */
    async regenerate(terminal, table, amount, force) {
        let keys = await Admin.findOne({ where: { table } });
        if (!keys && !force) throw { message: 'No such table' };
        if (!keys && force) keys = await Admin.create({ table, data: [] });
        for (let i = 0; i < amount; i++) {
            const hash = this.createHash(terminal);
            keys.data.push(hash);
            console.log(hash);
        }
        await Admin.update({ data: keys.data }, { where: { table } });
        console.log(`Created ${amount} hashes`)
    }
}

module.exports = Help;