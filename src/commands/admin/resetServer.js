const { resetServerData } = require('../../utils/resetHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'resetServer',
        description: (lang) => t(lang, 'commands.resetServer.description'),
        options: (lang) => [
            {
                name: 'target',
                type: 'STRING',
                description: t(lang, 'commands.resetServer.options.target'),
                required: true,
                choices: [
                    { name: t(lang, 'commands.resetServer.targets.all'), value: 'all' },
                    { name: t(lang, 'commands.resetServer.targets.balances'), value: 'balances' },
                    { name: t(lang, 'commands.resetServer.targets.warnings'), value: 'warnings' },
                    { name: t(lang, 'commands.resetServer.targets.shop'), value: 'shop' },
                    { name: t(lang, 'commands.resetServer.targets.mutes'), value: 'mutes' },
                    { name: t(lang, 'commands.resetServer.targets.settings'), value: 'settings' }
                ]
            }
        ]
    },
    async execute(interaction) {
        const target = interaction.options.getString('target');
        const { guildId, guild } = interaction;

        try {
            await resetServerData(guildId, target);

            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.resetServer.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.resetServer.successDescription', {
                        target: t(guild.language || 'en', `commands.resetServer.targets.${target}`)
                    })
                )
                .setColor('#FF4500')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error resetting server data:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.resetServer.errors.failed'),
                ephemeral: true
            });
        }
    }
};
