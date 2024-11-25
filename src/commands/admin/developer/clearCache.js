const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'clearCache',
        description: (lang) => t(lang, 'commands.developer.clearCache.description')
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        interaction.client.guilds.cache.clear();
        interaction.client.users.cache.clear();
        interaction.client.channels.cache.clear();

        await interaction.reply({
            content: t(interaction.guild.language || 'en', 'commands.developer.clearCache.success'),
            ephemeral: true
        });
    }
};
