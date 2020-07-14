const { UnicronDB, GuildDB, UserDB } = require('./database');
const { Logger } = require('../utils');

if (!process.argv.includes('--shard')) {
    (async function () {
        if (!process.argv.includes('--shard'))
            Logger.info('Connecting to databases...');
        const auth = [
            await UnicronDB.authenticate().then(() => {
                if (!process.argv.includes('--shard'))
                    Logger.info('Unicron Administrative Database synced!');
            }).catch(err => {
                Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
            }),
            await UserDB.authenticate().then(() => {
                if (!process.argv.includes('--shard'))
                    Logger.info('User Database synced!');
            }).catch(err => {
                Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
            }),
            await GuildDB.authenticate().then(() => {
                if (!process.argv.includes('--shard'))
                    Logger.info('Guild Database synced!');
            }).catch(err => {
                Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
            }),
        ];
        Promise.all(auth).then(() => {
            if (!process.argv.includes('--shard'))
                Logger.info('Database connection established!');
        }).catch(err => {
            return Logger.error(`Error occured on connecting to database : ${err} ${JSON.stringify(err)}`);
        });
    })();
}