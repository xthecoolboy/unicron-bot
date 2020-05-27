module.exports = (sequelize, DataType) => {
    return sequelize.define('leave', {
        guild_id: {
            type: DataType.STRING,
            primaryKey: true,
            unique: true,
        },
        channel: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        message: {
            type: DataType.TEXT,
            allowNull: false,
            defaultValue: '{user} has left the server.',
        },
        enabled: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        timestamps: false,
    });
}