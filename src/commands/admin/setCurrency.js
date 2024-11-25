const { setCurrencySymbol, getCurrencySymbol } = require('../../utils/currencyHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'set4',
        description: (lang) => t(lang, 'commands.set4.description'),
        options: (lang) => [
            {
                name: 'currency',
                type: 'SUB_COMMAND',
                description: t(lang, 'commands.set4.currency.description'),
                options: [
                    {
                        name: 'symbol',
                        type: 'STRING',
                        description: t(lang, 'commands.set4.currency.options.symbol'),
                        required: true
                    }
                ]
            }
        ]
    },
    async execute(interaction) {
        const symbol = interaction.options.getString('symbol');
        const { guildId } = interaction;

        if (symbol.length > 3) {
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.set4.currency.errors.tooLong'),
                ephemeral: true
            });
            return;
        }

        try {
            const updatedSymbol = await setCurrencySymbol(guildId, symbol);

            const embed = new EmbedBuilder()
                .setTitle(t(interaction.guild.language || 'en', 'commands.set4.currency.successTitle'))
                .setDescription(
                    t(interaction.guild.language || 'en', 'commands.set4.currency.successDescription', {
                        symbol: updatedSymbol
                    })
                )
                .setColor('#FFD700');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error setting currency symbol:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.set4.currency.errors.failed'),
                ephemeral: true
            });
        }
    }
};
