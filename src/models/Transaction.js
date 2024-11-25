const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        server_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('give', 'bet', 'shop', 'admin'),
            defaultValue: 'give'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'transactions',
        timestamps: false
    });

    Transaction.associate = models => {
        Transaction.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
        Transaction.belongsTo(models.User, { foreignKey: 'receiver_id', as: 'receiver' });
        Transaction.belongsTo(models.Server, { foreignKey: 'server_id' });
    };

    return Transaction;
};
