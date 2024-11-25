const { models } = require('../models/index');

const modifyBalance = async (guildId, userId, amount, action = 'add') => {
    const [userData, created] = await models.ServerUserData.findOrCreate({
        where: { guild_id: guildId, user_id: userId },
        defaults: { balance: 0 }
    });

    let updatedBalance;
    switch (action) {
        case 'add':
            updatedBalance = userData.balance + amount;
            break;
        case 'remove':
            updatedBalance = Math.max(0, userData.balance - amount); // 최소 0으로 유지
            break;
        case 'set':
            updatedBalance = amount;
            break;
        default:
            throw new Error('Invalid action type');
    }

    await userData.update({ balance: updatedBalance });

    return { user: userId, balance: updatedBalance, action };
};

const getBalance = async (guildId, userId) => {
    const userData = await models.ServerUserData.findOne({
        where: { guild_id: guildId, user_id: userId }
    });

    return userData ? userData.balance : 0;
};

module.exports = { modifyBalance, getBalance };
