
const Discord = require('discord.js');
const ms = require('ms');

const category = new Discord.Collection();
category.set('fun', 'Indeed very cool **Fun commands**.');
category.set('economy', 'Oustanding **Economy System**! ONE OF THE BEST');
category.set('misc', 'Miscellaneous commands! over over the door')
category.set('utility', '**Utility** commands that can help you do better.');
category.set('moderation', 'Simple **Moderation** commands to strict your server from rule breakers!');
category.set('settings', 'Fully **Customizable** Configurations. including simplistic interactive configuration setups.');
category.set('nsfw', `**NSFW** commands made too cool:>`);
category.set('dynamicvoice', '**Dynamic Voice System!** Which Allows users to create their own voice Channels to enhance your community environment as your users continue to meet new people.');
category.set('ticket', 'Wonderful **Ticket System** for ease of server management.');
category.set('staff', 'Bot Staff Commands ONLY!');

module.exports = {
    run: async function (client, message, args) {
        const prefix = await message.guild.db.settings('prefix');
        if (args.length) {
            if (category.has(args[0])) {
                let embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`${category.get(args[0])}.`)
                    .addField(`Commands:`,
                        `${client.commands.filter(command => command.config.category.includes(args[0]) && !command.options.donatorOnly)
                            .map(command => `\`${command.config.name}\``)
                            .join(', ')}` || `\u200b`)
                    .setFooter(`You can do 'help [Command]' to get a specific information about a command!`)
                if (client.commands.filter(command => command.config.category.includes(args[0]) && command.options.donatorOnly).map(command => `\`${command.config.name}\``).length) {
                    embed.addField(`\u200b`,
                        `[Premium Commands](${client.unicron.serverInviteURL} 'These commands are only exclusive to donators')
                            ${client.commands.filter(command => command.config.category.includes(args[0]) && command.options.donatorOnly)
                            .map(command => `\`${command.config.name}\``)
                            .join(', ')}
                        `
                    );
                }
                return message.channel.send(embed);
            }
            const name = args[0].toLowerCase();
            const command = client.commands.get(name) || client.commands.find(c => c.options.aliases && c.options.aliases.includes(name));
            if (!command) {

            } else {
                let embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`**${command.config.name}** Command`)
                    .setDescription(`${command.config.description}`)
                    .addField(`Category`, `• ${command.config.category}`, true)
                    .addField(`Cooldown`, `${ms(command.options.cooldown * 1000)}`, true)
                    ;
                if (command.options.aliases)
                    embed.addField(`Aliases`, `• ${command.options.aliases.join(', ')}`, true);
                if (command.options.usage)
                    embed.addField(`Usage`, `\`${command.options.usage}\``, true);
                if (command.config.permission)
                    embed.addField(`Required Permission`, `• \`${command.config.permission}\``, true);
                if (command.options.donatorOnly)
                    embed.setFooter('This command is exclusive only to donators');
                return message.channel.send(embed);
            }
        }
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x00FFFF)
            .setTitle('Unicron\'s Commands')
            .setDescription(`[Join here](${client.unicron.serverInviteURL} 'Support Server') if want a cool server to hangout in.\n\`help [Category]\`\nDefault Prefix for this server is \`${prefix}\``)
            .setFooter(`Made by undefine#6084`, client.user.displayAvatarURL())
            .addField(`${await client.getEmoji('staff')} Moderation`, `\`moderation\``, true)
            .addField(`${await client.getEmoji('settings')} Settings`, `\`settings\``, true)
            .addField(`🎫 Ticket System`, `\`ticket\``, true)
            .addField(`🎙️ Dynamic Voice`, `\`dynamicvoice\``, true)
            .addField(`💰 Economy`, `\`economy\``, true)
            .addField(`${await client.getEmoji('tools')} Utility`, `\`utility\``, true)
            .addField(`${await client.getEmoji('yes')} Misc`, `\`misc\``, true)
            .addField('😂 Fun', `\`fun\``, true)
            .addField(`🔞 NSFW`, '\`nsfw\`', true)
        );
    },
    config: {
        name: 'help',
        description: 'List all of my commands or show information about a specific command.',
        permission: 'User',
    },
    options: {
        aliases: ['commands'],
        cooldown: 3,
        args: false,
        usage: 'help [command | category]',
        donatorOnly: false,
    }
}