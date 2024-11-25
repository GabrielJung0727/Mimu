const { t } = require('../../utils/locale');

let maintenanceMode = false;

module.exports = {
    data: {
        name: 'setMaintenance',
        description: (lang) => t(lang, 'commands.developer.setMaintenance.description'),
        options: [
            {
                name: 'status',
                type: 'BOOLEAN',
                description: (lang) => t(lang, 'commands.developer.setMaintenance.options.status'),
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

        maintenanceMode = interaction.options.getBoolean('status');

        await interaction.reply({
            content: maintenanceMode
                ? t(interaction.guild.language || 'en', 'commands.developer.setMaintenance.enabled')
                : t(interaction.guild.language || 'en', 'commands.developer.setMaintenance.disabled'),
            ephemeral: true
        });
    }
};
