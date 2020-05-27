
const Emotes = require('../../assets/Emotes.json');

const { Client } = require('discord.js');

/**
 * @param {Client} client
*/
module.exports = (client) => {
    /**
     * @param {String} name Name
     */
    client.getEmoji = async function(name) {
        return client.emojis.cache.get(Emotes[name]);
    }
}