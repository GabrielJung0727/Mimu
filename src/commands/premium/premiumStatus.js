const PremiumUser = require('../../models/premiumUserModel');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'premiumStatus',
        description: '현재 프리미엄 상태를 확인합니다.',
    },
    async execute(interaction) {
        const userId = interaction.user.id;

        // 프리미엄 상태 조회
        const premiumData = await PremiumUser.getById(userId);

        const embed = new EmbedBuilder()
            .setTitle('💎 프리미엄 상태')
            .setColor(premiumData ? 0x00ff00 : 0xff0000);

        if (premiumData) {
            const now = new Date();
            const premiumUntil = new Date(premiumData.premium_until);
            const remainingDays = Math.ceil((premiumUntil - now) / (1000 * 60 * 60 * 24));

            if (remainingDays > 0) {
                embed.setDescription(
                    `✅ **프리미엄 활성화 중**\n남은 기간: **${remainingDays}일**\n\n감사합니다!`
                );
            } else {
                embed.setDescription('❌ 프리미엄이 만료되었습니다. 다시 구매해주세요.');
            }
        } else {
            embed.setDescription('❌ 현재 프리미엄이 활성화되어 있지 않습니다.');
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
