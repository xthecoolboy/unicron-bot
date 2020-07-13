const readline = require('readline');
const { BaseClient } = require('discord.js');
const Utils = require('../utils');
const BaseCommand = require('./classes/Command');
const path = require('path');
const fs = require('fs').promises;

class Terminal extends BaseClient {
    constructor() {
        super();
        this.utils = Utils;
        this.logger = this.utils.Logger;
        this.commands = [];
    }
    /**
     * @private
     * @param {string} dir 
     */
    async registerCommands(dir) {
        const filePath = path.join(__dirname,  dir);
        const files = await fs.readdir(filePath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const Command = require(path.join(filePath, file));
                if (Command.prototype instanceof BaseCommand) {
                    const instance = new Command();
                    this.on(instance.name, instance.run.bind(instance, this));
                    this.logger.info(`Terminal command '${instance.name}' loaded`)
                    this.commands.push(instance.name);
                }
            }
        }
    }
    /**
     * Initiate Terminal
     */
    async initiate() {
        await this.registerCommands('./commands');
        this.cli = readline.createInterface({ input: process.stdin, output: process.stdout });
        this.cli.on('line', (message) => {
            const args = message.split(/ +/g);
            const command = args.shift().toLowerCase();
            if (!this.commands.includes(command)) {
                this.logger.error(`Command not found!`, 'Terminal');
            }
            this.emit(command, args.join(' '), args);
        });
    }
}
module.exports = Terminal;