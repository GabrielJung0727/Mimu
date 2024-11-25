const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'reloadCommands',
        description: (lang) => t(lang, 'commands.developer.reloadCommands.description')
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.reloadCommands.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        try {
            interaction.client.commands.clear();
            const commandFiles = require('fs').readdirSync('./commands').flatMap((folder) => {
                return require('fs').readdirSync(`./commands/${folder}`).map(file => `./commands/${folder}/${file}`);
            });

            for (const file of commandFiles) {
                delete require.cache[require.resolve(file)];
                const command = require(file);
                interaction.client.commands.set(command.data.name, command);
            }

            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.reloadCommands.success'),
                ephemeral: true
            });
        } catch (error) {
            console.error('Error reloading commands:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.reloadCommands.errors.failed'),
                ephemeral: true
            });
        }
    }
};
