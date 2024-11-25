const { sequelize, connectDatabase } = require('../models/index');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('데이터베이스 동기화 완료');
    } catch (error) {
        console.error('데이터베이스 동기화 중 오류 발생:', error);
    }
}

module.exports = { connectDatabase, syncDatabase };
