
const ms = require('ms');
const { Collection, MessageEmbed, Message, Client } = require('discord.js');
const cooldowns = new Collection();
const LevelingCD = new Collection();

const Guild = require('../handlers/Guild');
const User = require('../handlers/User');
const Member = require('../handlers/Member');

const Blacklist = require('../modules/Blacklist');
const Tags = require('../modules/Tags');
const inviteFilter = require('../filters/inviteFilter');
const mentionSpamFilter = require('../filters/mentionSpamFilter');
const swearFilter = require('../filters/swearFilter');
const memberVerification = require('../modules/Verification');

/**
 * @param {Message} message
 * @param {Client} client
 */
module.exports = async (client, message) => {

    if (message.author.bot) return;

    if (await Blacklist(client, message)) return;

    if (message.channel.type === 'dm') {
        client.emit('directMessage', message);
        return;
    }

    if (!message.member) message.member.fetch();

    message.guild.db = new Guild(message.guild.id);
    message.author.db = new User(message.author.id);
    message.member.db = new Member(message.author.id, message.guild.id);

    message.author.permLevel = await client.permission.level(client, message);

    if (await memberVerification(client, message)) return;
    if (await inviteFilter(client, message)) return;
    if (await mentionSpamFilter(client, message)) return;

    const prefix = await message.guild.db.settings('prefix');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) {
        await swearFilter(client, message);
        return;
    }
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.options.aliases && cmd.options.aliases.includes(commandName));
    if (!command) {
        const msg = await Tags(message, commandName);
        if (msg === '[TAG_DOESNT_EXISTS]') {
            await swearFilter(client, message);
            return;
        }
        return message.channel.send(new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(msg)
        );
    }
    if (command.options.premiumServer && ! await message.guild.db.settings('premium')) {
        return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Sorry, this command is only for [Premium Servers](${message.unicron.serverInviteURL} 'Join here').`)
        );
    }
    if (message.author.permLevel < client.permission.cache.find((level) => level.name === command.config.permission).level) {
        return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`You do not have permission to use this command.
                Your permission level is ${client.permission[`${message.author.permLevel}`]})
                This command requires ${command.config.permission}`));
    }
    if (command.options.clientPermissions) {
        if (!message.guild.me.permissions.has(command.options.clientPermissions)) {
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setDescription(`Sorry, but i need ${permissions.join(', ')} permission(s) to execute this command.`));
        }
    }
    if (command.options.args && !args.length && command.options.usage) {
        return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`You didn't provide any arguments, ${message.author}!\nThe proper usage would be: \`${command.options.usage}\``));
    }
    message.flags = [];
    while (args[0] && args[0][0] === '-') {
        message.flags.push(args.shift().slice(1));
    }
    if (command.options.nsfwCommand && !message.channel.nsfw) {
        return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Sorry, i can\'t run nsfw commands on a non-nsfw channel.`));
    }
    if (!cooldowns.has(command.config.name)) {
        cooldowns.set(command.config.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.config.name);
    let cooldownAmount = (command.options.cooldown || 3) * 1000;
    const bcd = cooldownAmount;
    const donator = await message.author.db.profile('premium');
    if (command.options.donatorOnly && !donator) {
        return message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Sorry, this command is limited only for [Donators](${message.unicron.serverInviteURL} 'Click me!').`));
    } else if (donator) {
        cooldownAmount = Math.floor(cooldownAmount - (cooldownAmount * 0.35));
    }
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = Math.floor(expirationTime - now);
            const donCD = Math.floor(bcd - (bcd * 0.35));
            return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setDescription(` ${await client.getEmoji('slowmode', 'system')} Please wait **${ms(timeLeft)}** before reusing the command again.`)
            );
        }
    }
    if (!LevelingCD.has(message.author.id)) {
        LevelingCD.set(message.author.id, 'timer');
        message.author.db.levelup(client, message);
        if (await message.author.db.profile('premium')) setTimeout(() => LevelingCD.delete(message.author.id), 40000);
        else setTimeout(() => LevelingCD.delete(message.author.id), 55000);
    }
    try {
        if (command.run(client, message, args)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    } catch (e) {
        message.channel.send(new MessageEmbed()
            .setColor('RED')
            .setDescription(`Something went wrong executing that command. If this keeps on happening please report it to the Bot Developer to handle this issue at [Support Server](${client.unicron.serverInviteURL}).`)
        );
        client.logger.log(`Error on command : ${command.config.name}`, 'error');
        client.logger.error(e);
    }
};