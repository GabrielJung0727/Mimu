const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'buyPremium',
        description: '프리미엄 구매를 위해 서포트 서버로 이동합니다.',
    },
    async execute(interaction) {
        const supportServerLink = 'https://discord.gg/supportserver'; // 서포트 서버 링크

        const embed = new EmbedBuilder()
            .setTitle('💎 프리미엄 구매')
            .setDescription(`프리미엄 구매를 위해 [서포트 서버](${supportServerLink})로 이동해주세요.`)
            .setColor(0x00ff00)
            .setFooter({ text: '서포트 서버에서 도움을 받을 수 있습니다.' });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
