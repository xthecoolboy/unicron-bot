
const ms = require('pretty-ms');
const { Collection, RichEmbed } = require('discord.js');
const cooldowns = new Collection();
const LevelingCD = new Collection();

const swearFilter = require('../filters/swearFilter');
const inviteFilter = require('../filters/inviteFilter');
const mentionSpamFilter = require('../filters/noMentionSpamFilter');
const credentialsFilter = require('../filters/credentialsFilter');

const memberVerification = require('../handlers/memberVerification');

module.exports = async (client, message) => {

    if (await credentialsFilter(message)) return;

    if (message.author.bot || message.channel.type !== 'text' || !message.guild) return;

    if (!message.member) await message.guild.fetchMember(message.author);
    const guild = client.getGuild(message.guild.id);

    message.author.permLevel = await client.permlevel(message);

    if (await memberVerification(message, guild)) return;

    if (await mentionSpamFilter(client, message, guild)) return;
    if (await inviteFilter(client, message, guild)) return;
    if (await swearFilter(client, message, guild)) return;

    const prefix = await guild.getPrefix();

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${client.escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.options.aliases && cmd.options.aliases.includes(commandName));

    if (!command) return;

    message.flags = [];
    while (args[0] && args[0][0] === '-') {
        message.flags.push(args.shift().slice(1));
    }

    if (message.author.permLevel < client.levelCache[command.config.permission]) {
        return message.channel.send(new RichEmbed()
            .setColor('RED')
            .setDescription(`You do not have permission to use this command.
                Your permission level is ${message.author.permLevel} (${client.config.permLevels.find(l => l.level === level).name})
                This command requires level ${client.levelCache[command.config.permission]} (${command.config.permission})`));
    }

    if (command.options.clientPermissions) {
        if (!message.guild.me.permissions.has(command.options.clientPermissions)) {
            return message.channel.send(new RichEmbed()
                .setColor('RED')
                .setDescription(`Sorry, but i need ${permissions.join(', ')} permission(s) to do this command.`));
        }
    }
    if (command.options.args && !args.length && command.options.usage) {
        return message.channel.send(new RichEmbed()
            .setColor('RED')
            .setDescription(`You didn't provide any arguments, ${message.author}!\nThe proper usage would be: \`${command.options.usage}\``));
    }
    if (command.options.nsfwCommand && !message.channel.nsfw) {
        return message.channel.send(new RichEmbed()
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

    const user = client.getUser(message.author.id);

    if (command.options.donatorOnly && !client.isDonator(user.user_id)) {
        return message.channel.send(new RichEmbed()
            .setColor('RED')
            .setDescription('Sorry, this limited only for premium users, if you want to buy the premium feature for yourself goto Bot\'s [Support Server](https://discord.gg/WcefaSF/ \'Click here\') for more informations.'));
    } else if (client.isDonator(user.user_id)) {
        cooldownAmount = Math.floor(cooldownAmount - (cooldownAmount * 0.25));
    }

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const emoji = await client.customEmoji('slowmode');
            const timeLeft = Math.floor(expirationTime - now);
            const donCD = Math.floor(bcd - (bcd * 0.2));
            return message.channel.send(new RichEmbed()
                .setColor('RED')
                .setDescription(` ${emoji} Please wait **${ms(timeLeft)}** before reusing the command again.
                            Default Cooldown is **${ms(bcd)}**, while [Donators](https://discord.gg/WcefaSF/ 'Suppport Server') will only have to wait **${ms(donCD)}**`)
            );
        }
    }

    if (!LevelingCD.has(message.author.id)) {
        user.levelup(client, message);
        LevelingCD.set(message.author.id, 'timer');
        if (client.isDonator(message.author.id)) setTimeout(() => LevelingCD.delete(message.author.id), 40000);
        else setTimeout(() => LevelingCD.delete(message.author.id), 55000);
    }

    message.author.db = user;
    message.guild.db = guild;

    try {
        if (command.run(client, message, args, guild, user)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    } catch (e) {
        client.logger.log(`Error on command : ${command.config.name} : ${e} `, 'error');
    }
};