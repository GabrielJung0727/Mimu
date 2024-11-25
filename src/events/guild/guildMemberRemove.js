const { models } = require('../../models/index');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guildId = member.guild.id;

        // Update mute record as inactive
        await models.Mutes.update(
            { is_active: false },
            { where: { guild_id: guildId, user_id: member.id, is_active: true } }
        );
    }
};

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guildId = member.guild.id;

        try {
            // 유저 데이터 삭제 (예: 잔액, 인벤토리 등)
            await models.ServerUserData.destroy({
                where: { guild_id: guildId, user_id: member.id }
            });
        } catch (error) {
            console.error('Error removing user data:', error.message);
        }
    }
};

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guildId = member.guild.id;

        try {
            const leaveMessage = await getLeaveSetting(guildId, 'leave_message');
            const leaveChannelId = await getLeaveSetting(guildId, 'leave_channel');

            if (!leaveMessage || !leaveChannelId) return;

            const channel = member.guild.channels.cache.get(leaveChannelId);
            if (!channel) return;

            const parsedMessage = leaveMessage
                .replace('{user}', member.user.toString())
                .replace('{user_name}', member.user.username)
                .replace('{guild_name}', member.guild.name);

            if (leaveMessage.includes('{embed:')) {
                const embedName = leaveMessage.match(/{embed:([a-zA-Z0-9_-]+)}/)?.[1];
                const embed = new EmbedBuilder()
                    .setTitle(embedName || 'Goodbye!')
                    .setDescription(parsedMessage.replace(`{embed:${embedName}}`, ''))
                    .setColor('#FF6347');

                await channel.send({ embeds: [embed] });
            } else {
                await channel.send(parsedMessage);
            }
        } catch (error) {
            console.error('Error sending leave message:', error);
        }
    }
};