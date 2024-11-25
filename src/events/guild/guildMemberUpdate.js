const { getBoostSetting } = require('../../utils/messageSettingsHelper');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        if (!oldMember.premiumSince && newMember.premiumSince) {
            const guildId = newMember.guild.id;

            try {
                const boostMessage = await getBoostSetting(guildId, 'boost_message');
                const boostChannelId = await getBoostSetting(guildId, 'boost_channel');

                if (!boostMessage || !boostChannelId) return;

                const channel = newMember.guild.channels.cache.get(boostChannelId);
                if (!channel) return;

                const parsedMessage = boostMessage
                    .replace('{user}', newMember.user.toString())
                    .replace('{user_name}', newMember.user.username)
                    .replace('{guild_name}', newMember.guild.name);

                if (boostMessage.includes('{embed:')) {
                    const embedName = boostMessage.match(/{embed:([a-zA-Z0-9_-]+)}/)?.[1];
                    const embed = new EmbedBuilder()
                        .setTitle(embedName || 'Thank You!')
                        .setDescription(parsedMessage.replace(`{embed:${embedName}}`, ''))
                        .setColor('#FF69B4');

                    await channel.send({ embeds: [embed] });
                } else {
                    await channel.send(parsedMessage);
                }
            } catch (error) {
                console.error('Error sending boost message:', error);
            }
        }
    }
};

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        const guildId = newMember.guild.id;

        // 유저가 뮤트 해제된 경우 처리
        if (!newMember.communicationDisabledUntil && oldMember.communicationDisabledUntil) {
            try {
                await unmuteUser(guildId, newMember.id);
                console.log(`User ${newMember.user.tag} has been unmuted in guild ${guildId}.`);
            } catch (error) {
                console.error('Error updating unmute status:', error.message);
            }
        }
    }
};