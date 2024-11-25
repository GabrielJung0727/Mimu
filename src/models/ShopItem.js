const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const ShopItem = sequelize.define('ShopItem', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        giftable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'shop_items',
        timestamps: false
    });

    ShopItem.associate = models => {
        ShopItem.belongsTo(models.Server, { foreignKey: 'server_id' });
    };

    return ShopItem;
};
