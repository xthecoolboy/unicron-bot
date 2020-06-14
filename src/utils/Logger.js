const chalk = require('chalk');
const moment = require('moment');

const { settings } = require('../../config.json');

module.exports = {
	timestamp: function (thread = 'Server') {
		return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${thread} Thread]`;
	},
	info: function (content, thread = 'Server') {
		console.log(`${this.timestamp(thread)} ${chalk.black.bgWhite('[INFO]')} : ${content}`);
	},
	error: function (content, thread = 'Server') {
		console.log(`${this.timestamp(thread)} ${chalk.black.bgRed('[ERROR]')} : ${content}`);
		if (settings['tracing']) {
			console.log(chalk.black.bgRed('[ERROR_TRACE]'));
			console.trace(content);
			console.log(chalk.black.bgRed('[/ERROR_TRACE]'));
		}
	},
	warn: function (content, thread = 'Server') {
		if (settings['warnings']) {
			console.log(`${this.timestamp(thread)} ${chalk.black.bgYellow('[WARNING]')} : ${content}`);
			if (settings['tracing']) {
				console.log(chalk.black.bgYellow('[WARNING_TRACE]'));
				console.trace(content);
				console.log(chalk.black.bgYellow('[/WARNING_TRACE'));
			}
		}
	},
	debug: function (content, thread = 'Server') {
		if (settings['debug']) {
			console.log(`${this.timestamp(thread)} ${chalk.black.bgGreen('[DEBUG]')} : ${content}`);
		}
	}
}
/**
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
 */