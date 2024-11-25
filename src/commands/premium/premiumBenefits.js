const PremiumBenefits = require('../../models/premiumBenefitsModel');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'premiumBenefits',
        description: '프리미엄 혜택 목록을 확인합니다.',
    },
    async execute(interaction) {
        const benefits = await PremiumBenefits.getAll();

        const embed = new EmbedBuilder()
            .setTitle('💎 프리미엄 혜택')
            .setColor(0x00ff00)
            .setDescription('프리미엄 혜택 목록과 자세한 설명입니다.');

        benefits.forEach((benefit) => {
            embed.addFields({
                name: benefit.description,
                value: `**기본 제한:** ${benefit.free_value}\n**프리미엄 제한:** ${benefit.premium_value}`,
            });
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
