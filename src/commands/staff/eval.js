
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
async function safeEval(code) {
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
        })();
        ${code}
    `);
}

const { MessageEmbed } = require('discord.js');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    run: async function (client, message, args) {
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
            const output = safeEval(code);
            const clean = await client.clean(client, output);
            message.channel.send(new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
                .addField('Code', `${trim(content, 512)}`)
                .addField('Output', `\`\`\`xl\n${trim(clean, 1000)}\n\`\`\``)
            );
        } catch (err) {
            const clean = client.clean(client, err);
            message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL() || null)
                .addField('Output', `\`\`\`xl\n${trim(clean, 1000)}\n\`\`\``)
            );
        }

    },
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
}