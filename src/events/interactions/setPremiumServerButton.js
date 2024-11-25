const PremiumServer = require('../../models/premiumServerModel');

module.exports = {
    name: 'setPremiumServerButton',
    async execute(interaction) {
        await interaction.reply({
            content: '프리미엄 서버로 설정할 서버의 ID를 입력해주세요.',
            ephemeral: true,
        });

        const filter = (m) => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', async (message) => {
            const serverId = message.content.trim();
            const guild = interaction.client.guilds.cache.get(serverId);

            if (!guild) {
                await message.reply('유효하지 않은 서버 ID입니다. 다시 시도해주세요.');
                return;
            }

            await PremiumServer.assign(interaction.user.id, serverId);
            await message.reply(`서버 **${guild.name}**가 프리미엄 서버로 설정되었습니다.`);
            collector.stop();
        });

        collector.on('end', (_, reason) => {
            if (reason === 'time') {
                interaction.followUp('시간 초과로 설정이 취소되었습니다.');
            }
        });
    },
};
