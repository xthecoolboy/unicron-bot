module.exports = (sequelize, DataType) => {
    return sequelize.define('unicron', {
        table: {
            primaryKey: true,
            type: DataType.STRING,
            unique: true,
        },
        data: {
            type: DataType.JSON,
            allowNull: false,
            defaultValue: {},
        }
    }, {
        timestamps: false,
    });
}