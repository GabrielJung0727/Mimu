const PremiumUser = require('../models/premiumUserModel');
const PremiumServer = require('../models/premiumServerModel');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const premiumUtils = {
    /**
     * 프리미엄 사용자 추가 또는 업데이트
     * @param {string} userId
     * @param {number} premiumDuration - 프리미엄 기간(개월)
     */
    addPremiumUser: async (userId, premiumDuration) => {
        await PremiumUser.addOrUpdate(userId, premiumDuration);
    },

    /**
     * 프리미엄 서버 설정
     * @param {string} userId
     * @param {string} serverId
     */
    assignPremiumServer: async (userId, serverId) => {
        await PremiumServer.assign(userId, serverId);
    },

    /**
     * 서버가 프리미엄인지 확인
     * @param {string} serverId
     * @returns {boolean}
     */
    isPremiumServer: async (serverId) => {
        return await PremiumServer.isPremium(serverId);
    },

    /**
     * 프리미엄 등록된 사용자에게 DM 발송
     * @param {User} user
     */
    sendPremiumRegisteredDM: async (user) => {
        const embed = new EmbedBuilder()
            .setTitle('🎉 프리미엄 등록 완료!')
            .setDescription(
                '프리미엄 기능이 활성화되었습니다.\n아래 버튼을 눌러 프리미엄 서버를 설정하세요.'
            )
            .setColor(0x00ff00);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('set_premium_server')
                    .setLabel('프리미엄 서버 설정')
                    .setStyle(ButtonStyle.Primary)
            );

        await user.send({ embeds: [embed], components: [row] });
    },
    /**
     * 프리미엄 서버 설정 유도
     * @param {User} user
     */
    sendSetupDM: async (user) => {
        const embed = new EmbedBuilder()
            .setTitle('프리미엄 서버 설정')
            .setDescription('아래 버튼을 눌러 프리미엄 서버를 설정하세요.')
            .setColor(0x00ff00);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('set_premium_server')
                    .setLabel('프리미엄 서버 설정')
                    .setStyle(ButtonStyle.Primary)
            );

        await user.send({ embeds: [embed], components: [row] });
    },
    /**
         * 유저의 프리미엄 상태를 반환
         * @param {string} userId
         * @returns {Object|null}
         */
    getPremiumStatus: async (userId) => {
        return await PremiumUser.getById(userId);
    },
};

module.exports = premiumUtils;

const fetchPremiumMembers = async (guild) => {
    // 서버가 프리미엄인지 확인
    const isPremium = await PremiumServer.isPremium(guild.id);

    if (isPremium) {
        try {
            // 멤버 캐싱 (프리미엄 서버의 경우 모든 멤버를 로드)
            await guild.members.fetch();
            return true;
        } catch (error) {
            console.error(`Failed to fetch members for premium server ${guild.id}:`, error);
        }
    }
    return false;
};

module.exports = { fetchPremiumMembers };