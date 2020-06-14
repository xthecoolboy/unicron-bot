
const Emotes = require('../../assets/Emotes.json');
const Client = require('../classes/Unicron');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.logger.info('Loading Custom Emojis...');
    client.getEmoji = function (name) {
        return client.emojis.cache.get(Emotes[name]);
    }
    client.logger.info('Custom Emojis loaded.')
}