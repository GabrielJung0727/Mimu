const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'stats',
        description: (lang) => t(lang, 'commands.developer.stats.description')
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.stats.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const memoryUsage = process.memoryUsage();
        const embed = new EmbedBuilder()
            .setTitle(t(interaction.guild.language || 'en', 'commands.developer.stats.title'))
            .addFields(
                { name: t(interaction.guild.language || 'en', 'commands.developer.stats.fields.uptime'), value: `${process.uptime()}s`, inline: true },
                { name: t(interaction.guild.language || 'en', 'commands.developer.stats.fields.servers'), value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: t(interaction.guild.language || 'en', 'commands.developer.stats.fields.users'), value: `${interaction.client.users.cache.size}`, inline: true },
                { name: t(interaction.guild.language || 'en', 'commands.developer.stats.fields.memory'), value: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true }
            )
            .setColor('#4CAF50')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
