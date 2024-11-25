const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const Inventory = sequelize.define('Inventory', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        item_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'user_inventory',
        timestamps: false
    });

    Inventory.associate = models => {
        Inventory.belongsTo(models.User, { foreignKey: 'user_id' });
        Inventory.belongsTo(models.Server, { foreignKey: 'server_id' });
        Inventory.belongsTo(models.ShopItem, { foreignKey: 'item_id' });
    };

    return Inventory;
};
