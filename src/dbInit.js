const Sequelize = require('sequelize');
const { Logger } = require('./utils/');

require('dotenv').config();

const UnicronDB = new Sequelize(
    'database',
    process.env.UNICRON_DATABASE_USERNAME,
    process.env.UNICRON_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: `./database/${process.env.UNICRON_DATABASE_FILE}.sqlite`,
    }
);
const UserDB = new Sequelize(
    'database',
    process.env.USER_DATABASE_USERNAME,
    process.env.USER_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: `./database/${process.env.USER_DATABASE_FILE}.sqlite`,
    }
)
const GuildDB = new Sequelize(
    'database',
    process.env.GUILD_DATABASE_USERNAME,
    process.env.GUILD_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: `./database/${process.env.GUILD_DATABASE_FILE}.sqlite`,
    }
)

UnicronDB.import('./models/unicron');
UserDB.import('./models/user/profile');
UserDB.import('./models/user/inventory');
GuildDB.import('./models/guild/settings');
GuildDB.import('./models/guild/moderation');
GuildDB.import('./models/guild/welcome');
GuildDB.import('./models/guild/leave');
GuildDB.import('./models/guild/filter');
GuildDB.import('./models/guild/tags');
GuildDB.import('./models/guild/verification');
GuildDB.import('./models/guild/ticket');
GuildDB.import('./models/guild/dynamicVoice');
GuildDB.import('./models/guild/member');

const force = process.argv.includes('--force') || process.argv.includes('-f');
Logger.log('Connecting to databases...', 'log');
if (process.argv.includes('-all') || process.argv.includes('-unicron')) {
	UnicronDB.sync({ force }).then(() => {
		Logger.log('Unicron Database Synced!', 'log');
		UnicronDB.close();
	}).catch(Logger.error);
}
if (process.argv.includes('-all') || process.argv.includes('-user')) {
	UserDB.sync({ force }).then(() => {
		Logger.log('User Database Synced!', 'log');
		UserDB.close();
	}).catch(Logger.error);
}
if (process.argv.includes('-all') || process.argv.includes('-guild')) {
	GuildDB.sync({ force }).then(() => {
		Logger.log('Guild Database Synced!', 'log');
		GuildDB.close();
	}).catch(Logger.error);
}