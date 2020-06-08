module.exports = (sequelize, DataType) => {
    return sequelize.define('moderation', {
        guild_id: {
            type: DataType.STRING,
            unique: true,
            primaryKey: true,
        },
        data: {
            type: DataType.JSON,
            allowNull: false,
            defaultValue: {},
        },
        moderatorRole: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        adminRole: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        mutedRole: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        modLogChannel: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        autoModeration: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        autoModAction: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: 'MUTE',
        },
        maxWarnTreshold: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        warnTresholdAction: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: 'MUTE',
        },
        warnActionExpiresOn: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        warningExpiresOn: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
    })
}