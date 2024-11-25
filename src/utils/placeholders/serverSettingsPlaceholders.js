const ServerSettings = require('../../models/serverSettingsModel');

module.exports = {
    /**
     * 서버의 통화 정보를 반환
     * @param {Guild} guild
     * @returns {string}
     */
    server_currency: async (guild) => {
        const settings = await ServerSettings.getSettings(guild.id);
        return settings.currency || '🍪';
    },
};
