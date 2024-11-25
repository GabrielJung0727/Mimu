const { query } = require('../utils/database');

const PremiumUser = {
    addOrUpdate: async (userId, premiumDuration) => {
        const premiumUntil = new Date();
        premiumUntil.setMonth(premiumUntil.getMonth() + premiumDuration);

        await query(
            `
            INSERT INTO premium_users (id, premium_until)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
            premium_until = ?, updated_at = CURRENT_TIMESTAMP
            `,
            [userId, premiumUntil, premiumUntil]
        );
    },

    getById: async (userId) => {
        const result = await query(`SELECT * FROM premium_users WHERE id = ?`, [userId]);
        return result[0] || null;
    },
};

module.exports = PremiumUser;
