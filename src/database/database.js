const { Sequelize } = require('sequelize');
const { Logger } = require('../utils/');

function Debug(...args) {
    Logger.debug(args[0], 'Database');
}

const UnicronDB = new Sequelize(
    'database',
    process.env.UNICRON_DATABASE_USERNAME,
    process.env.UNICRON_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: Debug,
        storage: `./database/${process.env.UNICRON_DATABASE_FILE}.sqlite`,
        retry: {
            max: 10,
        },
        transactionType: 'IMMEDIATE',
    }
);
const UserDB = new Sequelize(
    'database',
    process.env.USER_DATABASE_USERNAME,
    process.env.USER_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: Debug,
        storage: `./database/${process.env.USER_DATABASE_FILE}.sqlite`,
        retry: {
            max: 10,
        },
        transactionType: 'IMMEDIATE',
    }
)
const GuildDB = new Sequelize(
    'database',
    process.env.GUILD_DATABASE_USERNAME,
    process.env.GUILD_DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'sqlite',
        logging: Debug,
        storage: `./database/${process.env.GUILD_DATABASE_FILE}.sqlite`,
        retry: {
            max: 10,
        },
        transactionType: 'IMMEDIATE',
    }
)

const Admin = UnicronDB.import('../models/unicron');

const UserProfile = UserDB.import('../models/user/profile');
const UserInventory = UserDB.import('../models/user/inventory');

const GuildSettings = GuildDB.import('../models/guild/settings');
const GuildModeration = GuildDB.import('../models/guild/moderation');
const GuildWelcome = GuildDB.import('../models/guild/welcome');
const GuildLeave = GuildDB.import('../models/guild/leave');
const GuildFilter = GuildDB.import('../models/guild/filter');
const GuildTags = GuildDB.import('../models/guild/tags');
const GuildVerification = GuildDB.import('../models/guild/verification');
const GuildTicket = GuildDB.import('../models/guild/ticket');
const GuildDynamicVoice = GuildDB.import('../models/guild/dynamicVoice');
const GuildMember = GuildDB.import('../models/guild/member');

(async function () {
    if (process.argv.includes('--database')) {
        const force = process.argv.includes('--reset');
        Logger.info('Connecting to databases...');
        if (process.argv.includes('--all') || process.argv.includes('--unicron')) {
            await UnicronDB.sync({ force }).then(() => {
                Logger.info('Unicron Database Synced!');
                UnicronDB.close();
            }).catch(Logger.error);
        }
        if (process.argv.includes('--all') || process.argv.includes('--user')) {
            await UserDB.sync({ force }).then(() => {
                Logger.info('User Database Synced!');
                UserDB.close();
            }).catch(Logger.error);
        }
        if (process.argv.includes('--all') || process.argv.includes('--guild')) {
            await GuildDB.sync({ force }).then(() => {
                Logger.info('Guild Database Synced!');
                GuildDB.close();
            }).catch(Logger.error);
        }
        process.exit(0);
    }
})();


module.exports = {
    UnicronDB,
    GuildDB,
    UserDB,
    Admin,
    UserProfile,
    UserInventory,
    GuildSettings,
    GuildDynamicVoice,
    GuildFilter,
    GuildWelcome,
    GuildLeave,
    GuildMember,
    GuildModeration,
    GuildTags,
    GuildTicket,
    GuildVerification,
}