const { addWarning, getWarningLimit } = require('../../utils/warningHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'warningAdd',
        description: (lang) => t(lang, 'commands.warning.add.description'),
        options: [
            {
                name: 'user',
                type: 'USER',
                description: (lang) => t(lang, 'commands.warning.add.options.user'),
                required: true
            },
            {
                name: 'reason',
                type: 'STRING',
                description: (lang) => t(lang, 'commands.warning.add.options.reason'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || t(interaction.guild.language || 'en', 'commands.warning.add.defaultReason');
        const { guild, guildId } = interaction;

        try {
            const warningCount = await addWarning(guildId, targetUser.id, reason);
            const warningLimit = await getWarningLimit(guildId);

            if (warningCount > warningLimit) {
                const member = await guild.members.fetch(targetUser.id);
                await member.ban({ reason: 'Exceeded warning limit' });

                await interaction.reply({
                    content: t(guild.language || 'en', 'commands.warning.add.successBanned', {
                        user: targetUser.tag
                    }),
                    ephemeral: false
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle(t(interaction.guild.language || 'en', 'commands.warning.add.successTitle'))
                .setDescription(
                    t(interaction.guild.language || 'en', 'commands.warning.add.successDescription', {
                        user: targetUser.tag,
                        reason,
                        count: warningCount
                    })
                )
                .setColor('#FFA500');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error adding warning:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.warning.add.errors.failed'),
                ephemeral: true
            });
        }
    }
};
