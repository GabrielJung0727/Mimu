const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const Server = sequelize.define('Server', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency_symbol: {
            type: DataTypes.STRING(10),
            defaultValue: '💰'
        },
        starting_balance: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'servers',
        timestamps: false
    });

    Server.associate = models => {
        Server.hasMany(models.Transaction, { foreignKey: 'server_id' });
        Server.hasMany(models.ShopItem, { foreignKey: 'server_id' });
        Server.hasMany(models.Inventory, { foreignKey: 'server_id' });
    };

    return Server;
};
