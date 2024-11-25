const { placeholderParser } = require('../../utils/placeholderParser');
const { t } = require('../../utils/locale');

module.exports = {
    data: {
        name: 'parse',
        description: (lang) => t(lang, 'commands.parse.description'),
        options: [
            {
                name: 'message',
                type: 'STRING',
                description: t(lang, 'commands.parse.options.message'),
                required: true
            },
            {
                name: 'args',
                type: 'STRING',
                description: t(lang, 'commands.parse.options.args'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const inputMessage = interaction.options.getString('message');
        const args = interaction.options.getString('args')?.split(',') || [];
        const context = {
            user: interaction.user,
            member: interaction.member,
            guild: interaction.guild,
            args,
            t: (lang, key, placeholders = {}) => {
                const locale = lang === 'ko' ? require('../../utils/ko.json') : require('../../utils/en.json');
                let value = locale;
                key.split('.').forEach(part => value = value[part]);
                Object.entries(placeholders).forEach(([k, v]) => value = value.replace(`{${k}}`, v));
                return value;
            }
        };

        const parsedMessage = placeholderParser(inputMessage, context);

        await interaction.reply({
            content: parsedMessage,
            ephemeral: false
        });
    }
};
