const { listWarnings } = require('../../utils/warningHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'warningList',
        description: (lang) => t(lang, 'commands.warning.list.description'),
        options: [
            {
                name: 'user',
                type: 'USER',
                description: (lang) => t(lang, 'commands.warning.list.options.user'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const { guildId } = interaction;

        try {
            const warnings = await listWarnings(guildId, targetUser.id);

            const embed = new EmbedBuilder()
                .setTitle(t(interaction.guild.language || 'en', 'commands.warning.list.title', { user: targetUser.tag }))
                .setDescription(
                    warnings.length > 0
                        ? warnings.map((reason, index) => `${index + 1}. ${reason}`).join('\n')
                        : t(interaction.guild.language || 'en', 'commands.warning.list.noWarnings')
                )
                .setColor('#FFD700');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error listing warnings:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.warning.list.errors.failed'),
                ephemeral: true
            });
        }
    }
};
