const { unmuteUser, isUserMuted } = require('../../utils/muteHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'unmute',
        description: (lang) => t(lang, 'commands.unmute.description'),
        options: [
            {
                name: 'user',
                type: 'USER',
                description: (lang) => t(lang, 'commands.unmute.options.user'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const { guild, guildId } = interaction;

        try {
            const isMuted = await isUserMuted(guildId, targetUser.id);

            if (!isMuted) {
                await interaction.reply({
                    content: t(guild.language || 'en', 'commands.unmute.errors.notMuted'),
                    ephemeral: true
                });
                return;
            }

            const member = await guild.members.fetch(targetUser.id);

            if (member.communicationDisabledUntil) {
                await member.timeout(null, 'Unmuted by admin');
            }

            await unmuteUser(guildId, targetUser.id);

            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.unmute.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.unmute.successDescription', {
                        user: targetUser.tag
                    })
                )
                .setColor('#4CAF50')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error unmuting user:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.unmute.errors.failed'),
                ephemeral: true
            });
        }
    }
};
