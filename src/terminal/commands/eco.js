const Command = require('../classes/Command');
const UserProfile = require('../../classes/User');
const Terminal = require('../Terminal');

class Eco extends Command {
    constructor() {
        super('eco');
    }
    /**
     * 
     * @param {Terminal} terminal 
     * @param {string} content 
     * @param {Array<string>} args 
     */
    async run(terminal, content, args) {
        const [action, user_id, value] = args;
        if (!action) {
            terminal.logger.error('Invalid arguments', 'Terminal');
            return;
        }
        switch (action) {
            case 'add': {
                if (!user_id || !value) {
                    terminal.logger.error(`Snowflake or amount is not provided`,'Terminal');
                    return;
                }
                if (!terminal.utils.Regex.discord.snowflake.test(user_id)) {
                    terminal.logger.info(`${user_id} is not a snowflake`,'Terminal');
                    return;
                }
                const user = new UserProfile(user_id);
                if (isNaN(value) || parseInt(value) <= 0) {
                    terminal.logger.error(`${value} is not a number or less than or equal to zero`, 'Terminal');
                }
                const amount = parseInt(value);
                await user.coins.add(amount);
                terminal.logger.info(`${amount} coin(s) has been added to ${user_id}`, 'Terminal');
                break;
            }
            case 'remove': {
                if (!user_id || !value) {
                    terminal.logger.error(`Snowflake or amount is not provided`,'Terminal');
                    return;
                }
                if (!terminal.utils.Regex.discord.snowflake.test(user_id)) {
                    terminal.logger.info(`${user_id} is not a snowflake`,'Terminal')
                    return;
                }
                const user = new UserProfile(user_id);
                if (isNaN(value) || parseInt(value) <= 0) {
                    terminal.logger.error(`${value} is not a number or less than or equal to zero`, 'Terminal');
                }
                const amount = parseInt(value);
                await user.coins.remove(amount);
                terminal.logger.info(`${amount} coin(s) has been deducted to ${user_id}`, 'Terminal');
                break;
            }
            case 'show':{
                if (!user_id) {
                    terminal.logger.error(`Snowflake is not provided`,'Terminal');
                    return;
                }
                if (!terminal.utils.Regex.discord.snowflake.test(user_id)) {
                    terminal.logger.info(`${user_id} is not a snowflake`,'Terminal')
                    return;
                }
                const user = new UserProfile(user_id);
                const amount = await user.coins.fetch();
                terminal.logger.info(`${user_id} has ${amount} coins`, 'Terminal');
                break;
            }
            default: {
                terminal.logger.error(`Invalid sub command`, 'Terminal');
                break;
            }
        }
    }
}

module.exports = Eco;