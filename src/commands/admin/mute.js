const { models } = require('../../models/index');
const { t } = require('../../utils/locale');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { applyMute } = require('../../utils/muteHelper');

module.exports = {
    data: {
        name: 'mute',
        description: (lang) => t(lang, 'commands.mute.description'),
        options: (lang) => [
            {
                name: 'user',
                type: 'USER',
                description: t(lang, 'commands.mute.options.user'),
                required: true
            },
            {
                name: 'duration',
                type: 'STRING',
                description: t(lang, 'commands.mute.options.duration'),
                required: false
            },
            {
                name: 'reason',
                type: 'STRING',
                description: t(lang, 'commands.mute.options.reason'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || t(interaction.guild.language || 'en', 'commands.mute.defaultReason');
        const { guild, guildId } = interaction;

        // 권한 확인
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.mute.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const expiresAt = duration ? new Date(Date.now() + require('ms')(duration)) : null;

        try {
            // 유틸리티를 사용해 뮤트 적용
            await applyMute(guild, targetUser.id, reason, expiresAt);

            // 데이터베이스에 뮤트 기록 추가
            await models.Mutes.create({
                guild_id: guildId,
                user_id: targetUser.id,
                moderator_id: interaction.user.id,
                reason: reason,
                expires_at: expiresAt
            });

            // 응답 메시지
            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.mute.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.mute.successDescription', {
                        user: targetUser.username,
                        duration: duration || t(guild.language || 'en', 'commands.mute.permanent'),
                        reason
                    })
                )
                .setColor('#FF0000')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error muting user:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.mute.errors.failed'),
                ephemeral: true
            });
        }
    }
};
