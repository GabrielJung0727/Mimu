const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'cacheStatus',
        description: (lang) => t(lang, 'commands.developer.cacheStatus.description')
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const client = interaction.client;
        const embed = new EmbedBuilder()
            .setTitle(t(interaction.guild.language || 'en', 'commands.developer.cacheStatus.title'))
            .addFields(
                { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${client.users.cache.size}`, inline: true },
                { name: 'Channels', value: `${client.channels.cache.size}`, inline: true },
                { name: 'Messages', value: 'Not cached by default', inline: true }
            )
            .setColor('#FF9800')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
