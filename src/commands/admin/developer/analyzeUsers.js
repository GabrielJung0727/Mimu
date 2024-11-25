const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'analyzeUsers',
        description: (lang) => t(lang, 'commands.developer.analyzeUsers.description')
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const guilds = interaction.client.guilds.cache;
        let totalUsers = 0;
        let activeUsers = 0;
        let mutedUsers = 0;

        for (const guild of guilds.values()) {
            const members = await guild.members.fetch();
            totalUsers += members.size;

            activeUsers += members.filter(member => member.presence?.status !== 'offline').size;
            mutedUsers += members.filter(member => member.communicationDisabledUntil).size;
        }

        const embed = new EmbedBuilder()
            .setTitle(t(interaction.guild.language || 'en', 'commands.developer.analyzeUsers.title'))
            .addFields(
                { name: t(interaction.guild.language || 'en', 'commands.developer.analyzeUsers.fields.totalUsers'), value: `${totalUsers}`, inline: true },
                { name: t(interaction.guild.language || 'en', 'commands.developer.analyzeUsers.fields.activeUsers'), value: `${activeUsers}`, inline: true },
                { name: t(interaction.guild.language || 'en', 'commands.developer.analyzeUsers.fields.mutedUsers'), value: `${mutedUsers}`, inline: true }
            )
            .setColor('#4CAF50')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
