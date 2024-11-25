const { models } = require('../../models/index');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'configureSettings',
        description: (lang) => t(lang, 'commands.configureSettings.description'),
        options: []
    },
    async execute(interaction) {
        const { guildId, guild } = interaction;

        try {
            // 서버 설정 데이터 조회
            const server = await models.Servers.findOne({ where: { id: guildId } });

            if (!server) {
                await interaction.reply({
                    content: t(guild.language || 'en', 'commands.configureSettings.errors.noServer'),
                    ephemeral: true
                });
                return;
            }

            // 설정값 읽기
            const currencySymbol = server.currency_symbol || t(guild.language || 'en', 'commands.configureSettings.defaults.currencySymbol');
            const welcomeMessage = server.welcome_message || t(guild.language || 'en', 'commands.configureSettings.defaults.welcomeMessage');
            const boostMessage = server.boost_message || t(guild.language || 'en', 'commands.configureSettings.defaults.boostMessage');
            const leaveMessage = server.leave_message || t(guild.language || 'en', 'commands.configureSettings.defaults.leaveMessage');

            // 임베드로 설정값 출력
            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.configureSettings.embedTitle'))
                .setColor('#4CAF50')
                .setDescription(t(guild.language || 'en', 'commands.configureSettings.embedDescription'))
                .addFields(
                    { name: t(guild.language || 'en', 'commands.configureSettings.fields.currencySymbol'), value: currencySymbol, inline: true },
                    { name: t(guild.language || 'en', 'commands.configureSettings.fields.welcomeMessage'), value: welcomeMessage, inline: false },
                    { name: t(guild.language || 'en', 'commands.configureSettings.fields.boostMessage'), value: boostMessage, inline: false },
                    { name: t(guild.language || 'en', 'commands.configureSettings.fields.leaveMessage'), value: leaveMessage, inline: false }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching server settings:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.configureSettings.errors.failed'),
                ephemeral: true
            });
        }
    }
};
