const moment = require('moment');

let lockedChoices = {};

module.exports = {
    /**
     * {date} - 현재 날짜와 시간 반환
     * @param {string} lang - 언어 코드 (기본값: 'en')
     * @returns {string} - 포맷된 현재 날짜와 시간
     */
    date: (lang = 'en') => {
        const format = lang === 'ko' ? 'ddd, MMMM D, YYYY A h:mm' : 'ddd, MMM D, YYYY h:mm A';
        return moment().locale(lang).format(format);
    },

    /**
     * {newline} 또는 {nl} - 새 줄 추가
     * @returns {string} - 줄바꿈 문자
     */
    newline: () => '\n',
    nl: () => '\n',

    range: (_, min, max) => {
        const value = Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);
        return value.toString();
    },

    choose: (_, ...choices) => {
        const choice = choices[Math.floor(Math.random() * choices.length)];
        lockedChoices['default'] = choices.indexOf(choice); // Default locked choice
        return choice;
    },

    lockedchoose: (_, ...choices) => {
        const lockedIndex = lockedChoices['default'] || 0; // Fallback to first choice
        return choices[lockedIndex] || choices[0];
    },

    requirearg: (_, argIndex, argType) => {
        if (!argIndex) return 'Missing argument index';
        const index = parseInt(argIndex, 10);
        const value = _[`args`]?.[index - 1]; // 1-based index

        if (!value) return `Missing argument at index ${index}`;
        if (argType && !validateArg(value, argType)) return `Invalid type for argument ${index}: expected ${argType}`;

        return value;
    },

    modifybal: (context, operation, amount, userId) => {
        const user = userId ? context.getUser(userId) : context.user;
        if (!user) return '사용자를 찾을 수 없습니다.';

        let balance = context.getUserBalance(user.id);
        const parsedAmount = parseFloat(amount);

        if (Math.abs(parsedAmount) > 100000) return '변경할 수 있는 최대 금액은 ±100,000입니다.';

        switch (operation) {
            case '+':
                balance += parsedAmount;
                break;
            case '-':
                balance -= parsedAmount;
                break;
            case '=':
                balance = parsedAmount;
                break;
            case '*':
                balance *= parsedAmount;
                break;
            case '/':
                balance /= parsedAmount;
                break;
            default:
                return '유효하지 않은 연산입니다.';
        }

        context.updateUserBalance(user.id, balance);
        return `잔액이 ${balance}로 업데이트되었습니다.`;
    },

    modifyinv: (context, item, quantity, userId) => {
        const user = userId ? context.getUser(userId) : context.user;
        if (!user) return '사용자를 찾을 수 없습니다.';

        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity)) return '유효하지 않은 수량입니다.';

        const inventory = context.getUserInventory(user.id);
        inventory[item] = (inventory[item] || 0) + parsedQuantity;

        if (inventory[item] < 0) inventory[item] = 0;
        context.updateUserInventory(user.id, inventory);

        return `${item}가(이) ${inventory[item]}로 업데이트되었습니다.`;
    },

    cooldown: (_, seconds) => {
        const now = Date.now();
        const cooldown = parseInt(seconds, 10) * 1000;

        if (cooldowns[_]?.end > now) {
            return `쿨다운 활성화: ${Math.ceil((cooldowns[_].end - now) / 1000)}초 남음`;
        }

        cooldowns[_] = { start: now, end: now + cooldown };
        return `${seconds}초 동안 쿨다운이 설정되었습니다.`;
    },

    addrole: async (context, roleMention, userId) => {
        const user = userId ? await context.guild.members.fetch(userId) : context.member;
        if (!user) return '사용자를 찾을 수 없습니다.';

        const roleId = roleMention.match(/<@&(\d+)>/)?.[1];
        const role = roleId ? context.guild.roles.cache.get(roleId) : null;
        if (!role) return '역할을 찾을 수 없습니다.';

        await user.roles.add(role);
        return `${role.name} 역할이 ${user.displayName}에게 추가되었습니다.`;
    },

    removerole: async (context, roleMention, userId) => {
        const user = userId ? await context.guild.members.fetch(userId) : context.member;
        if (!user) return '사용자를 찾을 수 없습니다.';

        const roleId = roleMention.match(/<@&(\d+)>/)?.[1];
        const role = roleId ? context.guild.roles.cache.get(roleId) : null;
        if (!role) return '역할을 찾을 수 없습니다.';

        await user.roles.remove(role);
        return `${role.name} 역할이 ${user.displayName}에서 제거되었습니다.`;
    },

    setnick: async (context, newNick, userId) => {
        const user = userId ? await context.guild.members.fetch(userId) : context.member;
        if (!user) return '사용자를 찾을 수 없습니다.';

        await user.setNickname(newNick);
        return `닉네임이 ${newNick}로 설정되었습니다.`;
    },

    react: async (context, emoji) => {
        try {
            await context.message.react(emoji);
            return `${emoji}로 반응했습니다.`;
        } catch {
            return '반응하지 못했습니다.';
        }
    },

    reactreply: async (context, emoji) => {
        try {
            const reply = await context.channel.send('반응 중...');
            await reply.react(emoji);
            return `${emoji}로 응답에 반응했습니다.`;
        } catch {
            return '응답에 반응하지 못했습니다.';
        }
    },

    addbutton: async (context, label) => {
        const button = new ButtonBuilder()
            .setCustomId('custom_button')
            .setLabel(label)
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);
        await context.channel.send({
            content: '버튼 추가:',
            components: [row],
        });
        return `버튼 "${label}"이 추가되었습니다.`;
    },
};
