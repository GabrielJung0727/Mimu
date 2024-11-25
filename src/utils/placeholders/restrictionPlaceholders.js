module.exports = {
    /**
     * {requireuser:} - 특정 사용자에게만 응답
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string[]} allowedUsers - 허용된 사용자 ID 목록
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requireuser: (context, ...allowedUsers) => {
        if (allowedUsers.includes(context.user.id)) return true;
        return '이 명령어는 지정된 사용자만 사용할 수 있습니다.';
    },

    /**
     * {requireperm:} - 특정 권한이 있는 경우만 응답
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string} requiredPerm - 필요한 권한 이름
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requireperm: (context, requiredPerm) => {
        if (context.member.permissions.has(requiredPerm)) return true;
        return `이 명령어를 사용하려면 ${requiredPerm} 권한이 필요합니다.`;
    },

    /**
     * {requirechannel:} - 특정 채널에서만 응답
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string[]} allowedChannels - 허용된 채널 ID 목록
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requirechannel: (context, ...allowedChannels) => {
        if (allowedChannels.includes(context.channel.id)) return true;
        return '이 명령어는 특정 채널에서만 사용할 수 있습니다.';
    },

    /**
     * {requirerole:} - 특정 역할이 있는 경우만 응답
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string[]} allowedRoles - 허용된 역할 ID 목록
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requirerole: (context, ...allowedRoles) => {
        const memberRoles = context.member.roles.cache.map((role) => role.id);
        if (allowedRoles.some((role) => memberRoles.includes(role))) return true;
        return '이 명령어를 사용하려면 특정 역할이 필요합니다.';
    },

    /**
     * {denychannel:} - 특정 채널에서 응답 금지
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string[]} deniedChannels - 금지된 채널 ID 목록
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    denychannel: (context, ...deniedChannels) => {
        if (!deniedChannels.includes(context.channel.id)) return true;
        return '이 명령어는 이 채널에서 사용할 수 없습니다.';
    },

    /**
     * {denyperm:} - 특정 권한이 있는 경우 응답 금지
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string} deniedPerm - 금지된 권한 이름
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    denyperm: (context, deniedPerm) => {
        if (!context.member.permissions.has(deniedPerm)) return true;
        return `${deniedPerm} 권한이 있는 사용자는 이 명령어를 사용할 수 없습니다.`;
    },

    /**
     * {denyrole:} - 특정 역할이 있는 경우 응답 금지
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string[]} deniedRoles - 금지된 역할 ID 목록
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    denyrole: (context, ...deniedRoles) => {
        const memberRoles = context.member.roles.cache.map((role) => role.id);
        if (!deniedRoles.some((role) => memberRoles.includes(role))) return true;
        return '이 명령어는 특정 역할을 가진 사용자가 사용할 수 없습니다.';
    },

    /**
     * {requirebal:} - 최소 잔액 요구
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {number} minBalance - 최소 잔액
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requirebal: (context, minBalance) => {
        const userBalance = context.getUserBalance(context.user.id);
        if (userBalance >= minBalance) return true;
        return `이 명령어를 사용하려면 최소 ${minBalance}의 잔액이 필요합니다.`;
    },

    /**
     * {requireitem:} - 특정 아이템 및 수량 요구
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string} itemName - 요구되는 아이템 이름
     * @param {number} quantity - 요구되는 수량 (기본값: 1)
     * @returns {boolean|string} - 사용 가능 여부 또는 제한 메시지
     */
    requireitem: (context, itemName, quantity = 1) => {
        const userInventory = context.getUserInventory(context.user.id);
        if ((userInventory[itemName] || 0) >= quantity) return true;
        return `${itemName} 아이템이 ${quantity}개 이상 필요합니다.`;
    },
};
