module.exports = {
    mention: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user ? `<@${user.id}>` : context.t(lang, 'errors.userNotFound');
    },

    tag: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user ? `${user.username}#${user.discriminator}` : context.t(lang, 'errors.userNotFound');
    },

    name: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user ? user.username : context.t(lang, 'errors.userNotFound');
    },

    avatar: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user ? user.avatarURL() : context.t(lang, 'errors.userNotFound');
    },

    id: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user ? user.id : context.t(lang, 'errors.userNotFound');
    },

    nick: (context, userId, lang = 'ko') => {
        const member = userId ? context.getMember(userId) : context.member;
        return member
            ? member.nickname || member.user.username
            : context.t(lang, 'errors.memberNotFound');
    },

    joindate: (context, userId, lang = 'ko') => {
        const member = userId ? context.getMember(userId) : context.member;
        return member
            ? member.joinedAt?.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US')
            : context.t(lang, 'errors.memberNotFound');
    },

    createdate: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        return user
            ? user.createdAt.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US')
            : context.t(lang, 'errors.userNotFound');
    },

    displaycolor: (context, userId, lang = 'ko') => {
        const member = userId ? context.getMember(userId) : context.member;
        return member ? member.displayHexColor : '#ffffff';
    },

    boostsince: (context, userId, lang = 'ko') => {
        const member = userId ? context.getMember(userId) : context.member;
        return member
            ? member.premiumSince?.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US') ||
              context.t(lang, 'placeholders.notBooster')
            : context.t(lang, 'errors.memberNotFound');
    },

    balance: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        const balance = user ? context.getUserBalance(user.id) : null;
        return balance !== null
            ? balance.toString()
            : context.t(lang, 'errors.balanceNotFound');
    },

    balance_locale: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        const balance = user ? context.getUserBalance(user.id) : null;
        return balance !== null
            ? balance.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US')
            : context.t(lang, 'errors.balanceNotFound');
    },

    item: (context, itemName, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        const inventory = user ? context.getUserInventory(user.id) : null;
        return inventory && inventory[itemName]
            ? `${inventory[itemName]} × ${itemName}`
            : context.t(lang, 'placeholders.itemNotFound', { itemName });
    },

    item_count: (context, itemName, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        const inventory = user ? context.getUserInventory(user.id) : null;
        return inventory && inventory[itemName]
            ? `${inventory[itemName]}`
            : '0';
    },

    inventory: (context, userId, lang = 'ko') => {
        const user = userId ? context.getUser(userId) : context.user;
        const inventory = user ? context.getUserInventory(user.id) : null;
        if (!inventory) return context.t(lang, 'errors.inventoryNotFound');
        return Object.entries(inventory)
            .map(([item, count]) => `${count} × ${item}`)
            .join(', ');
    },
};
