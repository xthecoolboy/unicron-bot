
module.exports = (sequelize, DataType) => {
    return sequelize.define('user_warns', {
        user_id: DataType.STRING,
        item_id: DataType.STRING,
        amount: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
    })
}