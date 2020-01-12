
const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (message.content.includes(process.env.TOKEN)) resolve(true);
			else return resolve(false);
			if (message.deletable) message.delete().catch(console.error);
			const owner = await client.users.resolve(process.env.BOT_OWNER);
			await owner.send(new MessageEmbed()
				.setColor('RED')
				.setTitle('ATTENTION!!')
				.setDescription('My token has been been exposed! Please regenerate it **ASAP** to prevent my malicious use by others.')
				.addField('Responsible user', `${message.author.tag} / ${message.author.id}`)
			);
		}
		catch (e) {
			reject(e);
		}
	});
}