
const ms = require('pretty-ms');
const { Collection, MessageEmbed, Message } = require('discord.js');
const Client = require('../classes/Unicron');
const BaseEvent = require('../classes/BaseEvent');
const cooldowns = new Collection();
const LevelingCD = new Collection();

const Blacklist = require('../modules/Blacklist');
const inviteFilter = require('../filters/inviteFilter');
const mentionSpamFilter = require('../filters/mentionSpamFilter');
const swearFilter = require('../filters/swearFilter');
const memberVerification = require('../modules/Verification');

const { Parse } = require('../utils/');

module.exports = class extends BaseEvent {
    constructor() {
        super('message');
    }
    /**
     * @param {Message} message
     * @param {Client} client
     * @param {boolean} triggerCommand 
     */
    async run(client, message, triggerCommand = true) {

        if (message.partial) await message.fetch();
        if (message.author.bot) return;

        if (await Blacklist(client, message.author.id, message.guild.id)) return;

        if (message.channel.type === 'dm') return await client.emit('directMessage', message);

        if (!message.guild) return;
        if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return;
        if (!message.member) await message.member.fetch();

        if (!message.author.db) message.author.db = await client.database.users.fetch(message.author.id, true);
        if (!message.guild.db) message.guild.db = await client.database.guilds.fetch(message.guild.id, true);
        message.author.permLevel = client.permission.level(message);

        if (await memberVerification(client, message)) return;
        if (await swearFilter(client, message)) return;
        if (await inviteFilter(client, message)) return;
        if (await mentionSpamFilter(client, message)) return;

        if (!triggerCommand) return;

        const prefix = await message.guild.db.settings('prefix');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.options.aliases && cmd.options.aliases.includes(commandName));
        if (!command) {
            const msg = await message.guild.db.tags({ action: 'fetch', name: commandName });
            if (msg === '[TAG_DOESNT_EXISTS]') return;
            return message.channel.send(msg.replace(/@/g, '@' + String.fromCharCode(2803)));
        }

        if (command.options.premiumServer && ! await message.guild.db.settings('premium')) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`Sorry, this command is only available for [Premium Servers](${client.unicron.serverInviteURL} 'Join here').`)
            );
        }
        if (message.author.permLevel < client.permission.cache.get(command.config.permission).level) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`You do not have permission to use this command.
                Your permission level is \`${client.permission.levels[message.author.permLevel]}\`
                This command requires \`${command.config.permission}\``)
            );
        }
        if (command.options.clientPermissions) {
            if (!message.guild.me.permissions.has(command.options.clientPermissions) || !message.channel.permissionsFor(message.guild.me).has(command.options.clientPermissions)) {
                return message.channel.send(new MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setDescription(`Sorry, but i need the following permisions to perform this command
\`\`\`xl
${command.options.clientPermissions.join(' ')}
\`\`\`
                    `)
                );
            }
        }
        if (command.options.args && !args.length && command.options.usage) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`You didn't provide any arguments, ${message.author}!\nThe proper usage would be: \n\`\`\`html\n${command.options.usage}\n\`\`\``)
            );
        }
        message.flags = [];
        while (args[0] && args[0][0] === '-') {
            message.flags.push(args.shift().slice(1));
        }
        if (command.options.nsfwCommand && !message.channel.nsfw) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`Sorry, i can\'t run nsfw commands on a non-nsfw channel.`)
            );
        }
        if (!cooldowns.has(command.config.name)) cooldowns.set(command.config.name, new Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(command.config.name);
        let cooldownAmount = (command.options.cooldown || 3) * 1000;
        const bcd = cooldownAmount;
        const donator = message.author.db.profile('premium');
        if (command.options.donatorOnly && !donator) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`Sorry, this command is limited only for [Donators](${message.unicron.serverInviteURL} 'Click me!').`)
            );
        } else if (donator) {
            cooldownAmount = Math.floor(cooldownAmount - (cooldownAmount * 0.28));
        }
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = Math.floor(expirationTime - now);
                const donCD = Math.floor(bcd - (bcd * 0.35));
                return message.channel.send(new MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setDescription(` ${await client.getEmoji('slowmode')} Please wait **${ms(timeLeft)}** before reusing the command again.`)
                );
            }
        }
        if (!LevelingCD.has(message.author.id)) {
            LevelingCD.set(message.author.id, 'timer');
            message.author.db.levelup(client, message);
            if (donator) setTimeout(() => LevelingCD.delete(message.author.id), 40000);
            else setTimeout(() => LevelingCD.delete(message.author.id), 55000);
        }
        try {
            client.logger.info(`Shard[${message.guild.shardID}][${message.guild.id}] (${message.author.tag}/${message.author.id}) ${commandName} ${args.join(' ')}`);
            const argv = command.argsDefinitions ? Parse(args, command.argsDefinitions) : args;
            const success = await command.run(client, message, argv).catch((e) => { throw e });
            if (success !== false) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        } catch (e) {
            message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`Something went wrong executing that command\nError Message: \`${e.message ? e.message : e}\``)
            );
            client.logger.error(e);
        }
    }
}