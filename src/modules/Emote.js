
const Emotes = require('../../assets/Emotes.json');

module.exports = async (client) => {
    await client.logger.info('Loading Custom Emojis...');
    client.getEmoji = function (name) {
        return client.emojis.cache.get(Emotes[name]);
    }
    await client.logger.info('Custom Emojis loaded.')
}