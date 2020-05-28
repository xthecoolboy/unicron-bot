
module.exports = (sequelize, DataType) => {
    return sequelize.define('user', {
        user_id: {
            primaryKey: true,
            type: DataType.STRING,
            unique: true,
        },
        balance: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        experience: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        premium: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        married_id: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: '',
        },
        multiplier: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        data: {
            type: DataType.JSON,
            allowNull: false,
            defaultValue: {},
        }
    }, {
        timestamps: false,
    })
}