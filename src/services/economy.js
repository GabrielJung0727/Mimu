const { models } = require('../models/index');

async function getBalance(serverId, userId) {
    const userData = await models.ServerUserData.findOne({ where: { server_id: serverId, user_id: userId } });
    return userData ? userData.balance : 0;
}

async function modifyBalance(serverId, userId, amount) {
    const userData = await models.ServerUserData.findOrCreate({
        where: { server_id: serverId, user_id: userId },
        defaults: { balance: 0 }
    });
    const currentBalance = userData[0].balance;
    const newBalance = currentBalance + amount;
    await userData[0].update({ balance: newBalance });
    return newBalance;
}

async function logTransaction(serverId, senderId, receiverId, amount, type = 'give') {
    await models.Transaction.create({
        server_id: serverId,
        sender_id: senderId,
        receiver_id: receiverId,
        amount: amount,
        type: type
    });
}

module.exports = { getBalance, modifyBalance, logTransaction };
