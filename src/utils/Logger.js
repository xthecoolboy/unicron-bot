const chalk = require('chalk');
const moment = require('moment');

const { settings } = require('../../config.json');

const dir = new RegExp(__dirname, 'g');

function timestamp(thread = 'Server') {
	return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${thread} Thread]`;
}

module.exports = {
	info: function (contents, thread = 'Server') {
        let content = '';
        if (contents.stack) content = contents.stack.replace(dir, '../');
        else content = contents.replace(dir, '../');
		console.log(`${timestamp(thread)} ${chalk.black.bgWhite('[INFO]')} : ${content}`);
	},
	error: function (contents, thread = 'Server') {
        let content = '';
        if (contents.stack) content = contents.stack.replace(dir, '../');
        else content = contents.replace(dir, '../');
		console.log(`${timestamp(thread)} ${chalk.black.bgRed('[ERROR]')} : ${content}`);
		if (settings['tracing']) {
			console.log(chalk.black.bgRed('[ERROR_TRACE]'));
			console.trace(content);
			console.log(chalk.black.bgRed('[/ERROR_TRACE]'));
		}
	},
	warn: function (contents, thread = 'Server') {
        let content = '';
        if (contents.stack) content = contents.stack.replace(dir, '../');
        else content = contents.replace(dir, '../');
		if (settings['warnings']) {
			console.log(`${timestamp(thread)} ${chalk.black.bgYellow('[WARNING]')} : ${content}`);
			if (settings['tracing']) {
				console.log(chalk.black.bgYellow('[WARNING_TRACE]'));
				console.trace(content);
				console.log(chalk.black.bgYellow('[/WARNING_TRACE]'));
			}
		}
	},
	debug: function (content, thread = 'Server') {
		if (settings['debug']) {
			console.log(`${timestamp(thread)} ${chalk.black.bgGreen('[DEBUG]')} : ${content}`);
		}
	}
}