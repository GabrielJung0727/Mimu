const ServerSettings = require('../models/serverSettingsModel');

/**
 * 서버 화폐 기호 설정
 * @param {string} guildId
 * @param {string} symbol
 */
const setCurrencySymbol = async (guildId, symbol) => {
    await ServerSettings.updateSettings(guildId, { currency: symbol });
    return symbol;
};

/**
 * 서버 화폐 기호 조회
 * @param {string} guildId
 */
const getCurrencySymbol = async (guildId) => {
    const settings = await ServerSettings.getSettings(guildId);
    return settings.currency || '🍪';
};

module.exports = { setCurrencySymbol, getCurrencySymbol };
