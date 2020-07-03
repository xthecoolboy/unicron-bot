const { Logger } = require('../utils');
const path = require('path');
const thisPath = path.join(__dirname, '..');

process.on('uncaughtException', (err) => {
    const errorMsg = err.stack ? err.stack.replace(new RegExp(`${thisPath}`, 'g'), './') : err.message;
    Logger.error(`Uncaught Exception: ${errorMsg}`, 'Process');
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    const errorMsg = err.stack ? err.stack.replace(new RegExp(`${thisPath}`, 'g'), './') : err.message;
    Logger.error(`Unhandled Rejection: ${errorMsg}`, 'Process');
});
process.on('warning', (err) => {
    Logger.warn(err, 'Process');
});
process.on('beforeExit', (code) => {
    Logger.info(`Exited with code ${code}`, 'Process');
});