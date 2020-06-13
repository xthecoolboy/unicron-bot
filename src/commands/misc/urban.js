
const Discord = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    run: async function (client, message, args) {
        const query = querystring.stringify({ term: args.join(' ') });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`No results found for **${args.join(' ')}**.`));
        }
        const [answer] = list;
        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addField('Definition', trim(answer.definition, 1024), false)
            .addField('Example', trim(answer.example, 1024), false)
            .setFooter(`Rating: ${answer.thumbs_up - answer.thumbs_down} Upvotes.`));
    },
    config: {
        name: 'urban',
        description: 'Urban Dictionary 101',
        permission: 'User',
    },
    options: {
        aliases: ['dict', 'urban-dict'],
        cooldown: 12,
        args: true,
        nsfwCommand: true,
        usage: 'urban [search item]',
        donatorOnly: false,
    }
}