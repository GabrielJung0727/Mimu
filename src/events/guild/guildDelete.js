const { resetServerData } = require('../../utils/resetHelper');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        try {
            // 서버 데이터 정리
            await resetServerData(guild.id, 'all');
            console.log(`All data for server ${guild.id} has been cleared.`);
        } catch (error) {
            console.error(`Error clearing data for server ${guild.id}:`, error);
        }
    }
};
