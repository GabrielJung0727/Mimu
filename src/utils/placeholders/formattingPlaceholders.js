const { EmbedBuilder } = require('discord.js');

module.exports = {
    /**
     * {dm} - 응답을 DM으로 리디렉션
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string} message - 보낼 메시지
     * @returns {string} - 성공 또는 실패 메시지
     */
    dm: async (context, message) => {
        try {
            const user = context.user;
            await user.send(message);
            return 'Message sent via DM.';
        } catch (error) {
            console.error('Error sending DM:', error);
            return 'Failed to send DM.';
        }
    },

    /**
     * {sendto:} - 응답을 특정 채널로 리디렉션
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {string} channelMention - 대상 채널의 언급
     * @param {string} message - 보낼 메시지
     * @returns {string} - 성공 또는 실패 메시지
     */
    sendto: async (context, channelMention, message) => {
        const channelId = channelMention.match(/^<#(\d+)>$/)?.[1];
        if (!channelId) return 'Invalid channel mention.';

        const channel = context.guild.channels.cache.get(channelId);
        if (!channel) return 'Channel not found.';

        try {
            await channel.send(message);
            return `Message sent to ${channel.name}.`;
        } catch (error) {
            console.error('Error sending to channel:', error);
            return 'Failed to send message to channel.';
        }
    },

    /**
     * {embed:} - 응답을 임베드로 변환
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {Object} options - 임베드 옵션 (색상 또는 미리 정의된 임베드 이름)
     * @param {string} content - 임베드 설명으로 사용할 메시지
     * @returns {Object} - Discord.js Embed 객체
     */
    embed: (context, options, content) => {
        const embed = new EmbedBuilder()
            .setDescription(content)
            .setTimestamp();

        // 색상 지정
        if (options?.color && /^#[0-9A-Fa-f]{6}$/.test(options.color)) {
            embed.setColor(options.color);
        } else {
            embed.setColor('#0099ff'); // 기본 색상
        }

        // 미리 정의된 임베드 이름 (향후 확장 가능)
        if (options?.embedName) {
            embed.setTitle(`Embed: ${options.embedName}`);
        }

        return embed;
    },
};
