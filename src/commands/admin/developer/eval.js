const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'eval',
        description: (lang) => t(lang, 'commands.developer.eval.description'),
        options: [
            {
                name: 'code',
                type: 'STRING',
                description: (lang) => t(lang, 'commands.developer.eval.options.code'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        if (!process.env.OWNER_ID.split(',').includes(interaction.user.id)) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.developer.eval.errors.noPermission'),
                ephemeral: true
            });
            return;
        }

        const code = interaction.options.getString('code');

        try {
            let evaled = await eval(code);
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

            await interaction.reply({ content: `\`\`\`js\n${evaled}\`\`\``, ephemeral: true });
        } catch (error) {
            await interaction.reply({
                content: `\`\`\`js\n${error.message}\`\`\``,
                ephemeral: true
            });
        }
    }
};
