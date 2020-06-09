module.exports = (sequelize, DataType) => {
    return sequelize.define('member', {
        guild_id: DataType.STRING,
        member_id: DataType.STRING,
        data: DataType.JSON,
    }, {
        timestamps: false,
    });
}