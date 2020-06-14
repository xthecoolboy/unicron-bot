
const { Collection } = require('discord.js');

module.exports = async (client) => {

    client.commands = new Collection();
    client.events = new Collection();
    client.shopitems = new Collection();

    client.awaitReply = async (msg, question, limit = 60000, obj = false) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            if (obj) return collected.first();
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };
    client.clean = async (client, text) => {
        if (text && text.constructor && text.constructor.name == 'Promise') text = await text;
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 1 });
        text = text.replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(client.token, 'no no no no');
        return text;
    };
    client.loadItem = (itemName) => {
        try {
            const props = require(`../items/${itemName}`);
            client.shopitems.set(`${props.config.id}`, props);
        } catch (e) {
            return `Unable to load item ${itemName}: ${e}`;
        }
    }
    client.unloadItem = async (itemName) => {
        const item = client.shopitems.get(itemName);
        if (!item) return `The item \`${itemName}\` doesn\'t seem to exists. Try again!`;
        client.shopitems.delete(itemName);
        const mod = require.cache[require.resolve(`../items/${item.config.id}`)];
        delete require.cache[require.resolve(`../items/${item.config.id}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    }
    client.loadCommand = (commandName, category) => {
        try {
            const props = require(`../commands/${category}/${commandName}`);
            if (props.init) {
                props.init(client);
            }
            props.config.category = category;
            client.commands.set(props.config.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    };
    client.unloadCommand = async (commandName) => {
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.options.aliases && cmd.options.aliases.includes(commandName));
        if (!command) return `The command \`${commandName}\` doesn\`t seem to exist, nor is it an alias. Try again!`;
        client.commands.delete(command.config.name);
        if (command.shutdown) {
            await command.shutdown(client);
        }
        const mod = require.cache[require.resolve(`../commands/${command.config.category}/${command.config.name}`)];
        delete require.cache[require.resolve(`../commands/${command.config.category}/${command.config.name}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };
    client.escapeRegex = (str) => { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') };

    client.chunk = function (array = [], chunkSize = 0) {
        return array.reduce(function (previous, current) {
            let chunk;
            if (previous.length === 0 ||
                previous[previous.length - 1].length === chunkSize) {
                chunk = [];
                previous.push(chunk);
            }
            else {
                chunk = previous[previous.length - 1];
            }
            chunk.push(current);
            return previous;
        }, []);
    }
    client.wait = require('util').promisify(setTimeout);
}