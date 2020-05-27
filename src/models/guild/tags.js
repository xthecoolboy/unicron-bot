module.exports = (sequelize, DataType) => {
    return sequelize.define('tags', {
        guild_id: DataType.STRING,
        tag_name: {
            type: DataType.STRING,
            unique: true,
        },
        value: DataType.TEXT,
    }, {
        timestamps: false,
    });
}