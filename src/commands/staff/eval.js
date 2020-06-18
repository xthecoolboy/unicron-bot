
/* 
(() => {
    const targetKey = Object.keys(this)[0];
    Object.defineProperty(this, targetKey, {
        get: function () {
            return arguments.callee.caller.constructor(
                "return global.process.mainModule.require('child_process').execSync('pwd').toString()"
            )();
        }
    });
})();


(function (){
  var ex = new Error
  ex.__proto__ = null
  ex.stack = {
    match: x => {
      return x.constructor.constructor("throw process.env")()
    }
  }
  return ex;
})()
*/
async function safeEval(code, client, message) {
    return eval(`
        (function () {
            Function = undefined;
            const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
            keys.forEach((key) => {
                const item = this[key];
                if (!item) return;
                if (typeof item.constructor !== 'function') return;
                this[key].constructor = undefined;
            });
            return ${code}
        })();
    `);
}

const { MessageEmbed, Message } = require('discord.js');
const Client = require('../../classes/Unicron');
const BaseCommand = require('../../classes/BaseCommand');

module.exports = class extends BaseCommand {
    constructor() {
        super({
            config: {
                name: 'eval',
                description: 'Evaluates Arbitary javascript.',
                permission: 'Bot Owner',
            },
            options: {
                cooldown: 3,
                nsfwCommand: false,
                args: true,
                usage: 'eval [...code]',
                donatorOnly: false,
            }
        });
    }
    /**
     * @returns {Promise<Message|Boolean>}
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {
        const content = args.join(' ');
        if (!/```js[a-z]*[\s\S]*?```/.test(content)) {
            return message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
                .addField('Output', `\`\`\`xl\nJavascript Codeblock Parse error\n\`\`\``)
            );
        }
        try {
            const code = content.replace(/```js/, '').replace(/```/, '');
            const output = safeEval(code, client, message);
            const clean = await client.clean(output);
            message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
                .addField('Code', `${client.trim(content, 512)}`)
                .addField('Output', `\`\`\`xl\n${client.trim(clean, 1000)}\n\`\`\``)
            );
        } catch (err) {
            const clean = await client.clean(err);
            message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
                .addField('Output', `\`\`\`xl\n${client.trim(clean, 1000)}\n\`\`\``)
            );
        }
    }
}