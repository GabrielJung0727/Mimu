const { models } = require('../../models/index');
const { evaluateRoleConditions } = require('../../utils/roleConditionHelper');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guildId = member.guild.id;

        // Check if the member was previously muted
        const muteRecord = await models.Mutes.findOne({
            where: { guild_id: guildId, user_id: member.id, is_active: true }
        });

        if (muteRecord) {
            const muteRole = member.guild.roles.cache.find(role => role.name === 'Muted');
            if (muteRole) {
                await member.roles.add(muteRole, 'Reapplying mute on rejoin');
            } else {
                const remainingTime = muteRecord.expires_at
                    ? Math.max(new Date(muteRecord.expires_at) - Date.now(), 0)
                    : null;

                if (remainingTime > 0) {
                    await member.timeout(remainingTime, 'Reapplying mute on rejoin');
                }
            }
        }
    }
};

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        await evaluateRoleConditions(member.guild, member, 'onJoin', 1); // 가입 시 조건은 항상 만족
    }
};

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guildId = member.guild.id;

        try {
            const welcomeMessage = await getWelcomeSetting(guildId, 'welcome_message');
            const welcomeChannelId = await getWelcomeSetting(guildId, 'welcome_channel');

            if (!welcomeMessage || !welcomeChannelId) return;

            const channel = member.guild.channels.cache.get(welcomeChannelId);
            if (!channel) return;

            const parsedMessage = welcomeMessage
                .replace('{user}', member.user.toString())
                .replace('{user_name}', member.user.username)
                .replace('{guild_name}', member.guild.name);

            if (welcomeMessage.includes('{embed:')) {
                const embedName = welcomeMessage.match(/{embed:([a-zA-Z0-9_-]+)}/)?.[1];
                const embed = new EmbedBuilder()
                    .setTitle(embedName || 'Welcome!')
                    .setDescription(parsedMessage.replace(`{embed:${embedName}}`, ''))
                    .setColor('#00AAFF');

                await channel.send({ embeds: [embed] });
            } else {
                await channel.send(parsedMessage);
            }
        } catch (error) {
            console.error('Error sending welcome message:', error);
        }
    }
};

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guildId = member.guild.id;
        const warningCount = await addWarning(guildId, member.id, 'Auto-ban due to warning limit');

        const warningLimit = await getWarningLimit(guildId);

        if (warningCount > warningLimit) {
            try {
                await member.ban({ reason: 'Exceeded warning limit' });
                console.log(`User ${member.user.tag} has been banned for exceeding the warning limit.`);
            } catch (error) {
                console.error('Error banning user for exceeding warning limit:', error);
            }
        }
    }
};