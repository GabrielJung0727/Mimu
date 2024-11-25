module.exports = {
    /**
     * {message_id} - 메시지 ID 반환
     * @param {Message} message - Discord 메시지 객체
     * @returns {string} - 메시지 ID
     */
    message_id: (message) => {
        return message.id;
    },

    /**
     * {message_content} - 메시지 내용 반환
     * @param {Message} message - Discord 메시지 객체
     * @returns {string} - 메시지 내용
     */
    message_content: (message) => {
        return message.content || '내용이 없습니다.';
    },

    /**
     * {message_link} - 메시지 링크 반환
     * @param {Message} message - Discord 메시지 객체
     * @returns {string} - 메시지 링크
     */
    message_link: (message) => {
        const guildId = message.guild?.id || '@me'; // DM인 경우 '@me'
        const channelId = message.channel.id;
        return `https://discord.com/channels/${guildId}/${channelId}/${message.id}`;
    },
};
