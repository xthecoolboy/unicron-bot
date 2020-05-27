const Sequelize = require('sequelize');
const { Logger } = require('../utils/');

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

const SyncDatabase = async function () {
    Logger.log('Connecting to databases...', 'log');
    const auth = [
        await UnicronDB.authenticate().then(() => {
            Logger.log('Unicron Administrative Database synced!', 'log');
        }).catch(err => {
            Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
        }),
        await UserDB.authenticate().then(() => {
            Logger.log('User Database synced!', 'log');
        }).catch(err => {
            Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
        }),
        await GuildDB.authenticate().then(() => {
            Logger.log('Guild Database synced!', 'log');
        }).catch(err => {
            Logger.error(`Unable to connect to the database: ${err} ${JSON.stringify(err)}`);
        }),
    ];
    Promise.all(auth).then(() => {
        Logger.log('Database connection established!', 'log');
    }).catch(err => {
        return Logger.error(`Error occured on connecting to database : ${err} ${JSON.stringify(err)}`);
    })
}

module.exports = {
    SyncDatabase,
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