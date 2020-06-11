
const Discord = require('discord.js');

function rot13(s) {
    return s.replace( /[A-Za-z]/g , function(c) {
      return String.fromCharCode( c.charCodeAt(0) + ( c.toUpperCase() <= "M" ? 13 : -13 ) );
    } );
  }

module.exports = {
    /**
     * 
     * @param {Discord.Client} client Client
     * @param {Discord.Message} message Message
     * @param {Array} args Arguments
     */
    run: async function (client, message, args) {
        message.channel.send(
            rot13(
                args.join(' ')
            ).replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        );
    },
    config: {
        name: 'rot13',
        description: 'Encodes your given text to ROT13',
        permission: 'User',
    },
    options: {
        aliases: [],
        clientPermissions: [],
        cooldown: 3,
        nsfwCommand: false,
        args: false,
        usage: '',
        donatorOnly: false,
        premiumServer: false,
    }
}