const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const AutoResponder = sequelize.define('AutoResponder', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        trigger: {
            type: DataTypes.STRING,
            allowNull: false
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        match_mode: {
            type: DataTypes.ENUM('exact', 'contains', 'regex'),
            defaultValue: 'exact'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'auto_responders',
        timestamps: false
    });

    AutoResponder.associate = models => {
        AutoResponder.belongsTo(models.Server, { foreignKey: 'server_id' });
    };

    return AutoResponder;
};
