
const Emotes = require('../../assets/Emotes.json');

const { Client } = require('discord.js');

/**
 * @param {Client} client
*/
module.exports = (client) => {
    /**
     * @param {String} name Name
     * @param {String} group Group
     */
    client.getEmoji = async function(name, group = 'badges') {
        return client.emojis.cache.get(Emotes[group][name]);
    }
}