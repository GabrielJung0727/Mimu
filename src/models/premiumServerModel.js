const { query } = require('../utils/database');

const PremiumServer = {
    isPremium: async (serverId) => {
        const result = await query(
            `SELECT 1 FROM premium_servers WHERE server_id = ?`,
            [serverId]
        );
        return result.length > 0;
    },
};

module.exports = PremiumServer;
