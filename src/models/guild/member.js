module.exports = (sequelize, DataType) => {
    return sequelize.define('member', {
        guild_id: DataType.STRING,
        member_id: {
            type: DataType.STRING,
            unique: true,
        },
        data: DataType.JSON,
    }, {
        timestamps: false,
    });
}