const { models } = require('../models/index');

const applyMute = async (guild, userId, reason, expiresAt) => {
    const member = await guild.members.fetch(userId).catch(() => null);
    if (!member) throw new Error('Member not found');

    const muteRole = guild.roles.cache.find(role => role.name === 'Muted');
    if (muteRole) {
        await member.roles.add(muteRole, reason);
    } else if (expiresAt) {
        const remainingTime = Math.max(new Date(expiresAt) - Date.now(), 0);
        await member.timeout(remainingTime, reason);
    }

    return member;
};

const unmuteUser = async (guildId, userId) => {
    const muteData = await models.Mutes.findOne({ where: { guild_id: guildId, user_id: userId } });

    if (!muteData) {
        throw new Error('User is not muted.');
    }

    await models.Mutes.destroy({ where: { guild_id: guildId, user_id: userId } });

    return true;
};

const isUserMuted = async (guildId, userId) => {
    const muteData = await models.Mutes.findOne({ where: { guild_id: guildId, user_id: userId } });
    return !!muteData;
};

module.exports = { unmuteUser, isUserMuted };
