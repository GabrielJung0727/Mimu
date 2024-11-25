const { isPremium } = require('../../models/premiumServerModel');

module.exports = {
    server_boostlevel: async (guild) => {
        const premium = await isPremium(guild.id);
        if (premium) {
            await guild.members.fetch(); // 프리미엄 서버 캐싱
        }
        return guild.premiumTier || 0;
    },
    server_boostlevel: (guild) => {
        return guild.premiumTier || 0; // 부스트 레벨 (0에서 3까지)
    },

    server_boostcount: (guild) => {
        return guild.premiumSubscriptionCount || 0; // 부스트 횟수
    },

    server_nextboostlevel: (guild) => {
        const boostLevels = [2, 7, 14]; // 부스트 레벨 요구
        const currentTier = guild.premiumTier || 0;

        if (currentTier === 3) {
            return '최대 레벨에 도달했습니다';
        }

        return currentTier + 1;
    },

    server_nextboostlevel_required: (guild) => {
        const boostLevels = [2, 7, 14];
        const currentTier = guild.premiumTier || 0;

        if (currentTier === 3) {
            return '최대 레벨에 도달했습니다';
        }

        return boostLevels[currentTier];
    },

    server_nextboostlevel_until_required: (guild) => {
        const boostLevels = [2, 7, 14];
        const currentTier = guild.premiumTier || 0;

        if (currentTier === 3) {
            return '최대 레벨에 도달했습니다';
        }

        const requiredBoosts = boostLevels[currentTier];
        const currentBoosts = guild.premiumSubscriptionCount || 0;

        return Math.max(requiredBoosts - currentBoosts, 0); // 남은 부스트 수
    },
};