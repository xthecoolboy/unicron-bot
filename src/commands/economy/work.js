
const Discord = require('discord.js');
const { Random } = require('../../utils');
const { Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

const salary = {
    mailman: {
        max: 1000,
        min: 1000 - 500,
    },
    developer: {
        max: 4000,
        min: 4000 - 1000,
    },
    carpenter: {
        max: 2000,
        min: 2000 - 1000,
    },
    mechanic: {
        max: 3000,
        min: 3000 - 1000,
    },
    police: {
        max: 5000,
        min: 5000 - 1000,
    }
}

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'work',
                description: 'Earn coins by working!\nJobs:\nmailman, developer, carpenter, mechanic, police',
                permission: 'User',
            },
            options: {
                aliases: [],
                clientPermissions: [],
                cooldown: 60 * 15,
                nsfwCommand: false,
                args: true,
                usage: 'work <Job>\nJobs:\n- mailman\n- developer\n- carpenter\n- mechanic\n- police',
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
        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }) || null);
        let status = true;
        const job = args[0].toLowerCase();
        if (!job || !['mailman', 'developer', 'carpenter', 'mechanic', 'police'].includes(job)) {
            message.channel.send(new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setDescription(`Hey, that is not a valid job.\nAvailable Jobs:\nmailman, developer, carpenter, mechanic, police`)
            );
            return false;
        }
        const payout = Random.nextInt(salary[job]);
        switch (job) {
            case 'mailman': {
                await message.author.db.coins.add(payout);
                embed.setDescription(`You have worked as a ${job} and earned **${payout}** coins!`)
                break;
            }
            case 'developer': {
                if (!await message.author.db.inventory.has('laptop')) {
                    status = false;
                    embed.setDescription(`Hey, you need a laptop to work as a developer.`);
                    break;
                }
                await message.author.db.coins.add(payout);
                embed.setDescription(`You have worked as a ${job} and earned **${payout}** coins!`)
                break;
            }
            case 'carpenter': {
                if (!await message.author.db.inventory.has('hammer')) {
                    status = false;
                    embed.setDescription(`Hey, you need a hammer to work as a carpenter.`);
                    break;
                }
                await message.author.db.coins.add(payout);
                embed.setDescription(`You have worked as a ${job} and earned **${payout}** coins!`)
                break;
            }
            case 'mechanic': {
                if (!await message.author.db.inventory.has('wrench')) {
                    status = false;
                    embed.setDescription(`Hey, you need a wrench to work as a mechanic.`);
                    break;
                }
                await message.author.db.coins.add(payout);
                embed.setDescription(`You have worked as a ${job} and earned **${payout}** coins!`)
                break;
            }
            case 'police': {
                if (!await message.author.db.inventory.has('pistol')) {
                    status = false;
                    embed.setDescription(`Hey, you need a pistol to work as a police.`);
                    break;
                }
                await message.author.db.coins.add(payout);
                embed.setDescription(`You have worked as a ${job} and earned **${payout}** coins!`)
                break;
            }
        }
        message.channel.send(embed);
        return status;
    }
}