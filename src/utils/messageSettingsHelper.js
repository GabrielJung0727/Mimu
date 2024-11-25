const { models } = require('../models/index');

const updateBoostSetting = async (guildId, type, value) => {
    const server = await models.Servers.findOne({ where: { id: guildId } });
    if (!server) throw new Error('Server not found');

    const updateData = {};
    updateData[type] = value;

    await server.update(updateData);
    return { type, value };
};

const getBoostSetting = async (guildId, type) => {
    const server = await models.Servers.findOne({ where: { id: guildId } });
    if (!server) throw new Error('Server not found');

    return server[type];
};

module.exports = { updateBoostSetting, getBoostSetting };
