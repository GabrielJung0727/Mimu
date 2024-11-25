const moment = require('moment');

module.exports = {
    /**
     * {channel} - 채널의 언급
     * @param {GuildChannel} channel - Discord 채널 객체
     * @returns {string} - 채널 언급
     */
    channel: (channel) => {
        return `<#${channel.id}>`;
    },

    /**
     * {channel_name} - 채널 이름
     * @param {GuildChannel} channel - Discord 채널 객체
     * @returns {string} - 채널 이름
     */
    channel_name: (channel) => {
        return channel.name;
    },

    /**
     * {channel_createdate} - 채널 생성 날짜
     * @param {GuildChannel} channel - Discord 채널 객체
     * @param {string} lang - 언어 코드
     * @returns {string} - 채널 생성 날짜 (형식화됨)
     */
    channel_createdate: (channel, lang = 'en') => {
        const format = lang === 'ko' ? 'YYYY년 MM월 DD일 A h:mm' : 'dddd, MMMM Do YYYY, h:mm A';
        return moment(channel.createdAt).locale(lang).format(format);
    },
};
