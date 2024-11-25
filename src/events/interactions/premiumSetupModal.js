const PremiumServer = require('../../models/premiumServerModel');

module.exports = {
    name: 'premiumSetupModal',
    async execute(interaction) {
        const serverId = interaction.fields.getTextInputValue('server_id');

        const guild = interaction.client.guilds.cache.get(serverId);
        if (!guild) {
            await interaction.reply({ content: '유효하지 않은 서버 ID입니다.', ephemeral: true });
            return;
        }

        await PremiumServer.assign(interaction.user.id, serverId);
        await interaction.reply({ content: `서버 **${guild.name}**가 프리미엄 서버로 설정되었습니다.`, ephemeral: true });
    },
};
