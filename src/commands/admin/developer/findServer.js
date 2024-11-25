const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'findServer',
        description: (lang) => t(lang, 'commands.developer.findServer.description'),
        options: [
            {
                name: 'keyword',
                type: 'STRING',
                description: (lang) => t(lang, 'commands.developer.findServer.options.keyword'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const keyword = interaction.options.getString('keyword');
        const matchedGuilds = interaction.client.guilds.cache.filter(guild => guild.name.toLowerCase().includes(keyword.toLowerCase()));

        if (!matchedGuilds.size) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.findServer.errors.noMatch', { keyword }),
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(t(interaction.guild.language || 'en', 'commands.developer.findServer.title'))
            .setDescription(
                matchedGuilds.map(guild => `**${guild.name}**: ${guild.memberCount} members`).join('\n')
            )
            .setColor('#00AAFF');

        await interaction.reply({ embeds: [embed] });
    }
};
