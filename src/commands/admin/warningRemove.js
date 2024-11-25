const { removeWarning } = require('../../utils/warningHelper');
const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'warningRemove',
        description: (lang) => t(lang, 'commands.warning.remove.description'),
        options: [
            {
                name: 'user',
                type: 'USER',
                description: (lang) => t(lang, 'commands.warning.remove.options.user'),
                required: true
            },
            {
                name: 'index',
                type: 'INTEGER',
                description: (lang) => t(lang, 'commands.warning.remove.options.index'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const index = interaction.options.getInteger('index') - 1; // 1-based indexing
        const { guildId } = interaction;

        try {
            const warningCount = await removeWarning(guildId, targetUser.id, index);

            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.warning.remove.success', {
                    user: targetUser.tag,
                    count: warningCount
                }),
                ephemeral: false
            });
        } catch (error) {
            console.error('Error removing warning:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.warning.remove.errors.invalidIndex'),
                ephemeral: true
            });
        }
    }
};
