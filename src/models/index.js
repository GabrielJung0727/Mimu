const { Sequelize } = require('sequelize');
const { DATABASE_URI } = require('../config/config');

const sequelize = new Sequelize(DATABASE_URI, {
    dialect: 'mysql',
    logging: false
});

const models = {
    User: require('./User')(sequelize),
    Server: require('./Server')(sequelize),
    Transaction: require('./Transaction')(sequelize),
    ShopItem: require('./ShopItem')(sequelize),
    Inventory: require('./Inventory')(sequelize),
    AutoResponder: require('./AutoResponder')(sequelize)
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('데이터베이스 연결 성공');
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
    }
}

module.exports = { sequelize, models, connectDatabase };
