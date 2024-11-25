const { models } = require('../models/index');

const addWarning = async (guildId, userId, reason) => {
    const [warning] = await models.Warnings.findOrCreate({
        where: { guild_id: guildId, user_id: userId },
        defaults: { warnings: [] }
    });

    warning.warnings.push(reason);
    await warning.update({ warnings: warning.warnings });

    return warning.warnings.length;
};

const removeWarning = async (guildId, userId, index) => {
    const warning = await models.Warnings.findOne({ where: { guild_id: guildId, user_id: userId } });

    if (!warning || !warning.warnings[index]) {
        throw new Error('Invalid warning index');
    }

    warning.warnings.splice(index, 1);
    await warning.update({ warnings: warning.warnings });

    return warning.warnings.length;
};

const listWarnings = async (guildId, userId) => {
    const warning = await models.Warnings.findOne({ where: { guild_id: guildId, user_id: userId } });
    return warning ? warning.warnings : [];
};

const getWarningLimit = async (guildId) => {
    const server = await models.Servers.findOne({ where: { id: guildId } });
    return server ? server.warning_limit : 3; // 기본값 3
};

const setWarningLimit = async (guildId, limit) => {
    const server = await models.Servers.findOne({ where: { id: guildId } });
    if (!server) throw new Error('Server not found');

    await server.update({ warning_limit: limit });
    return limit;
};

module.exports = { addWarning, removeWarning, listWarnings, getWarningLimit, setWarningLimit };
