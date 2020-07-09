const Discord = require('discord.js');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');
const dit = '.';
const dah = '–';
function morse(char) {
    switch (char) {
        case 'a': return dit + dah;
        case 'b': return dah + dit + dit + dit;
        case 'c': return dah + dit + dah + dit;
        case 'd': return dah + dit + dit;
        case 'e': return dit;
        case 'f': return dit + dit + dah + dit;
        case 'g': return dah + dah + dit;
        case 'h': return dit + dit + dit + dit;
        case 'i': return dit + dit;
        case 'j': return dit + dah + dah + dah;
        case 'k': return dah + dit + dah;
        case 'l': return dit + dah + dit + dit;
        case 'm': return dah + dah;
        case 'n': return dah + dit;
        case 'o': return dah + dah + dah;
        case 'p': return dit + dah + dah + dit;
        case 'q': return dah + dah + dit + dah;
        case 'r': return dit + dah + dit;
        case 's': return dit + dit + dit;
        case 't': return dah;
        case 'u': return dit + dit + dah;
        case 'v': return dit + dit + dit + dah;
        case 'w': return dit + dah + dah;
        case 'x': return dah + dit + dit + dah;
        case 'y': return dah + dit + dah + dah;
        case 'z': return dah + dah + dit + dit;
        case '0': return dah + dah + dah + dah + dah;
        case '1': return dit + dah + dah + dah + dah;
        case '2': return dit + dit + dah + dah + dah;
        case '3': return dit + dit + dit + dah + dah;
        case '4': return dit + dit + dit + dit + dah;
        case '5': return dit + dit + dit + dit + dit;
        case '6': return dah + dit + dit + dit + dit;
        case '7': return dah + dah + dit + dit + dit;
        case '8': return dah + dah + dah + dit + dit;
        case '9': return dah + dah + dah + dah + dit;
        case '.': return dit + dah + dit + dah + dit + dah;
        case ',': return dah + dah + dit + dit + dah + dah;
        case '?': return dit + dit + dah + dah + dit + dit;
        case '\'': return dit + dah + dah + dah + dah + dit;
        case '!': return dah + dit + dah + dit + dah + dah;
        case '/': return dah + dit + dit + dah + dit;
        case '(': return dah + dit + dah + dah + dit;
        case ')': return dah + dit + dah + dah + dit + dah;
        case '&': return dit + dah + dit + dit + dit;
        case ':': return dah + dah + dah + dit + dit + dit;
        case ';': return dah + dit + dah + dit + dah + dit;
        case '=': return dah + dit + dit + dit + dah;
        case '+': return dit + dah + dit + dah + dit;
        case '-': return dah + dit + dit + dit + dit + dah;
        case '"': return dit + dah + dit + dit + dah + dit;
        case '$': return dit + dit + dit + dah + dit + dit + dah;
        case '@': return dit + dah + dah + dit + dah + dit;
        case 'à': return dit + dah + dah + dit + dah;
        case 'ä': return dit + dah + dit + dah;
        case 'å': return dit + dah + dah + dit + dah;
        case 'ą': return dit + dah + dit + dah;
        case 'æ': return dit + dah + dit + dah;
        case 'ć': return dah + dit + dah + dit + dit;
        case 'ĉ': return dah + dit + dah + dit + dit;
        case 'ç': return dah + dit + dah + dit + dit;
        case 'ch': return dah + dah + dah + dah;
        case 'đ': return dit + dit + dah + dit + dit;
        case 'ð': return dit + dit + dah + dah + dit;
        case 'é': return dit + dit + dah + dit + dit;
        case 'è': return dit + dah + dit + dit + dah;
        case 'ę': return dit + dit + dah + dit + dit;
        case 'ĝ': return dah + dah + dit + dah + dit;
        case 'ĥ': return dah + dah + dah + dah;
        case 'ĵ': return dit + dah + dah + dah + dit;
        case 'ł': return dit + dah + dit + dit + dah;
        case 'ń': return dah + dah + dit + dah + dah;
        case 'ñ': return dah + dah + dit + dah + dah;
        case 'ó': return dah + dah + dah + dit;
        case 'ö': return dah + dah + dah + dit;
        case 'ø': return dah + dah + dah + dit;
        case 'ś': return dit + dit + dit + dah + dit + dit + dit;
        case 'ŝ': return dit + dit + dit + dah + dit;
        case 'š': return dah + dah + dah + dah;
        case 'þ': return dit + dah + dah + dit + dit;
        case 'ü': return dit + dit + dah + dah;
        case 'ŭ': return dit + dit + dah + dah;
        case 'ź': return dah + dah + dit + dit + dah + dit;
        case 'ż': return dah + dah + dit + dit + dah;
        case ' ':
        default: return '\u2007'
    }
};
module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'morse',
                description: 'Encodes the given text into Morse Code',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'morse <...Text>',
                donatorOnly: false,
                premiumServer: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<string>} args 
     */
    async run(client, message, args) {
        args = args.join(' ').toLowerCase();
        args = args.replace(/./g, x => `${morse(x)}\u2001`).trim();
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`\`${client.shorten(args, 1024)}\``)
        );
    }
}