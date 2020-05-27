module.exports = (sequelize, DataType) => {
    return sequelize.define('dynamicVoice', {
        guild_id: {
            type: DataType.STRING,
            unique: true,
            primaryKey: true,
        },
        category: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        waitingRoom: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        data: {
            type: DataType.JSON,
            allowNull: false,
            defaultValue: {},
        },
        enabled: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        timestamps: false,
    })
}