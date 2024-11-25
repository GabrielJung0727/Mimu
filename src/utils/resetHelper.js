const { models } = require('../models/index');

const resetServerData = async (guildId, target = 'all') => {
    switch (target) {
        case 'all':
            await resetAllData(guildId);
            break;
        case 'balances':
            await resetBalances(guildId);
            break;
        case 'warnings':
            await resetWarnings(guildId);
            break;
        case 'shop':
            await resetShopItems(guildId);
            break;
        case 'mutes':
            await resetMutes(guildId);
            break;
        case 'settings':
            await resetSettings(guildId);
            break;
        default:
            throw new Error('Invalid reset target');
    }

    return target;
};

const resetAllData = async (guildId) => {
    await resetBalances(guildId);
    await resetWarnings(guildId);
    await resetShopItems(guildId);
    await resetMutes(guildId);
    await resetSettings(guildId);
};

const resetBalances = async (guildId) => {
    await models.ServerUserData.update({ balance: 0 }, { where: { guild_id: guildId } });
};

const resetWarnings = async (guildId) => {
    await models.Warnings.destroy({ where: { guild_id: guildId } });
};

const resetShopItems = async (guildId) => {
    await models.ShopItems.destroy({ where: { guild_id: guildId } });
};

const resetMutes = async (guildId) => {
    await models.Mutes.destroy({ where: { guild_id: guildId } });
};

const resetSettings = async (guildId) => {
    await models.Servers.update(
        {
            currency_symbol: null,
            welcome_message: null,
            boost_message: null,
            leave_message: null,
            warning_limit: 3 // 기본 경고 리밋
        },
        { where: { id: guildId } }
    );
};

module.exports = {
    resetServerData,
    resetBalances,
    resetWarnings,
    resetShopItems,
    resetMutes,
    resetSettings
};
