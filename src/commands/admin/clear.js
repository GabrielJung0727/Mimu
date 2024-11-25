const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'clear',
        description: (lang) => t(lang, 'commands.clear.description'),
        options: (lang) => [
            {
                name: 'amount',
                type: 'INTEGER',
                description: t(lang, 'commands.clear.options.amount'),
                required: true
            },
            {
                name: 'user',
                type: 'USER',
                description: t(lang, 'commands.clear.options.user'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');
        const { channel, guild } = interaction;

        if (amount < 1 || amount > 100) {
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.clear.errors.invalidAmount'),
                ephemeral: true
            });
            return;
        }

        // Fetch messages
        const messages = await channel.messages.fetch({ limit: 100 });
        const filteredMessages = user
            ? messages.filter((msg) => msg.author.id === user.id).first(amount)
            : messages.first(amount);

        // Bulk delete
        try {
            const deleted = await channel.bulkDelete(filteredMessages, true);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.clear.success', {
                    count: deleted.size
                }),
                ephemeral: true
            });
        } catch (error) {
            console.error('Error clearing messages:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.clear.errors.failed'),
                ephemeral: true
            });
        }
    }
};
