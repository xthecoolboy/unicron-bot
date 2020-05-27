module.exports = (sequelize, DataType) => {
    return sequelize.define('verification', {
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
        role: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        type: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: 'discrim',
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