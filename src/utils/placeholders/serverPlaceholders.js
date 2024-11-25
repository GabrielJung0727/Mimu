module.exports = {
    name: (context, lang = 'ko') => context.guild.name || context.t(lang, 'errors.serverNotFound'),

    id: (context, lang = 'ko') => context.guild.id || context.t(lang, 'errors.serverNotFound'),

    membercount: (context, lang = 'ko') => context.guild.memberCount || context.t(lang, 'errors.serverNotFound'),

    membercount_ordinal: (context, lang = 'ko') => {
        const count = context.guild.memberCount || 0;
        return context.t(lang, 'placeholders.ordinal', { number: count });
    },

    membercount_nobots: (context, lang = 'ko') => {
        const nonBotCount = context.guild.members.cache.filter(member => !member.user.bot).size;
        if (nonBotCount === 0) {
            return context.t(lang, 'placeholders.cachingLimit');
        }
        return nonBotCount;
    },

    membercount_nobots_ordinal: (context, lang = 'ko') => {
        const nonBotCount = context.guild.members.cache.filter(member => !member.user.bot).size;
        return context.t(lang, 'placeholders.ordinal', { number: nonBotCount });
    },

    botcount: (context, lang = 'ko') => {
        const botCount = context.guild.members.cache.filter(member => member.user.bot).size;
        if (botCount === 0) {
            return context.t(lang, 'placeholders.cachingLimit');
        }
        return botCount;
    },

    botcount_ordinal: (context, lang = 'ko') => {
        const botCount = context.guild.members.cache.filter(member => member.user.bot).size;
        return context.t(lang, 'placeholders.ordinal', { number: botCount });
    },

    icon: (context, lang = 'ko') => {
        const iconURL = context.guild.iconURL();
        return iconURL || context.t(lang, 'placeholders.noIcon');
    },

    rolecount: (context, lang = 'ko') => context.guild.roles.cache.size || context.t(lang, 'errors.serverNotFound'),

    channelcount: (context, lang = 'ko') => context.guild.channels.cache.size || context.t(lang, 'errors.serverNotFound'),

    randomMember: async (guild, lang = 'ko') => {
        await fetchPremiumMembers(guild);
        const member = guild.members.cache.random();
        return member
            ? `<@${member.id}>`
            : lang === 'ko'
            ? '활성화된 멤버를 찾을 수 없습니다.'
            : 'No active members found.';
    },

    randommember_tag: (context, lang = 'ko') => {
        const members = context.guild.members.cache.random();
        return members ? `${members.user.username}#${members.user.discriminator}` : context.t(lang, 'placeholders.noMember');
    },

    randommember_nobots: (context, lang = 'ko') => {
        const members = context.guild.members.cache.filter(member => !member.user.bot).random();
        return members
            ? `<@${members.id}>`
            : context.t(lang, 'placeholders.randomMemberLimit');
    },

    owner: (context, lang = 'ko') => `<@${context.guild.ownerId}>` || context.t(lang, 'errors.serverNotFound'),

    owner_id: (context, lang = 'ko') => context.guild.ownerId || context.t(lang, 'errors.serverNotFound'),

    createdate: (context, lang = 'ko') =>
        context.guild.createdAt
            ? context.guild.createdAt.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US')
            : context.t(lang, 'errors.serverNotFound'),
};
