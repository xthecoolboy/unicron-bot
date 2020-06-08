
const Discord = require('discord.js');

const Guild = require('../handlers/Guild');


/**
 * @param {Discord.Client} client
 * @param {Discord.Guild} guild
 */
module.exports = async (client, guild) => {
    const channel = await client.channels.fetch(client.unicron.channel);
    try {
        const gg = new Guild(guild.id);
        gg.destroy();
    } catch (err) {
        console.log(err);
    }
    client.user.setPresence({
        activity: { 
            name: `${client.guilds.cache.size} guilds!`, 
            type: 'LISTENING',
        }, 
        status: 'online',
    });
    channel.send(`Unicron left \`${guild.name}\``);
}