
const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "log") => {
	const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
	switch (type) {
		case "log": {
			return console.log(`${timestamp} ${chalk.bgBlue(`[${type.toLowerCase()}]`)} ${content} `);
		}
		case "warn": {
			return console.log(`${timestamp} ${chalk.black.bgYellow(`[${type.toLowerCase()}]`)} ${content} `);
		}
		case "error": {
			return console.log(`${timestamp} ${chalk.bgRed(`[${type.toLowerCase()}]`)} ${content} `);
		}
		case "debug": {
			return console.log(`${timestamp} ${chalk.green(`[${type.toLowerCase()}]`)} ${content} `);
		}
		case "cmd": {
			return console.log(`${timestamp} ${chalk.black.bgWhite(`[${type.toLowerCase()}]`)} ${content}`);
		}
		case "ready": {
			return console.log(`${timestamp} ${chalk.black.bgGreen(`[${type.toLowerCase()}]`)} ${content}`);
		}
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
	}
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");