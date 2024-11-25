const { models } = require('../../models/index');
const { evaluateRoleConditions } = require('../../utils/roleConditionHelper');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const { guild, author } = message;
        const [userData, created] = await models.ServerUserData.findOrCreate({
            where: { guild_id: guild.id, user_id: author.id },
            defaults: { message_count: 1 }
        });

        if (!created) {
            await userData.increment('message_count');
        }

        const messageCount = userData.message_count + 1;

        await evaluateRoleConditions(guild, message.member, 'messageCount', messageCount);
    }
};

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const guildId = message.guild.id;
        const userId = message.author.id;

        try {
            await modifyBalance(guildId, userId, 10, 'add'); // 메시지 당 10 포인트 추가
        } catch (error) {
            console.error('Error modifying balance:', error.message);
        }
    }
};