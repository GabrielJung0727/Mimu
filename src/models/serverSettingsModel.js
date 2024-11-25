const { query } = require('../utils/database');

const ServerSettings = {
    /**
     * 서버 설정 가져오기
     * @param {string} serverId
     * @returns {Object|null}
     */
    getSettings: async (serverId) => {
        const result = await query(
            `
            SELECT * FROM server_settings WHERE server_id = ?
            `,
            [serverId]
        );
        return result[0] || null;
    },

    /**
     * 서버 설정 저장/업데이트
     * @param {string} serverId
     * @param {Object} settings
     */
    updateSettings: async (serverId, settings) => {
        await query(
            `
            INSERT INTO server_settings (server_id, prefix, currency)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE
            prefix = ?, currency = ?
            `,
            [serverId, settings.prefix, settings.currency, settings.prefix, settings.currency]
        );
    },
};

module.exports = ServerSettings;