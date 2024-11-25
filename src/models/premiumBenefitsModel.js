const {query} = require('../utils/database');

const PremiumBenefits = {
    /**
     * 모든 혜택 가져오기
     */
    getAll: async () => {
        const result = await query('SELECT * FROM premium_benefits');
        return result;
    },

    /**
     * 특정 혜택 가져오기
     * @param {string} benefitName
     */
    getAll: async (benefitName) => {
        const result = await query(
            'SELECT * FROM premium_benefits WHERE benefit_name = ?',
        [benefitName]
    );
    return result[0] || null;
    },
};

module.exports = PremiumBenefits;