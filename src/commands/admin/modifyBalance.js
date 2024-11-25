const { modifyBalance, getBalance } = require('../../utils/balanceHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'modifyBalance',
        description: (lang) => t(lang, 'commands.modifyBalance.description'),
        options: (lang) => [
            {
                name: 'action',
                type: 'STRING',
                description: t(lang, 'commands.modifyBalance.options.action'),
                required: true,
                choices: [
                    { name: t(lang, 'commands.modifyBalance.actions.add'), value: 'add' },
                    { name: t(lang, 'commands.modifyBalance.actions.remove'), value: 'remove' },
                    { name: t(lang, 'commands.modifyBalance.actions.set'), value: 'set' }
                ]
            },
            {
                name: 'user',
                type: 'USER',
                description: t(lang, 'commands.modifyBalance.options.user'),
                required: true
            },
            {
                name: 'amount',
                type: 'INTEGER',
                description: t(lang, 'commands.modifyBalance.options.amount'),
                required: true
            }
        ]
    },
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const targetUser = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        const { guildId, guild } = interaction;

        try {
            const result = await modifyBalance(guildId, targetUser.id, amount, action);

            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.modifyBalance.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.modifyBalance.successDescription', {
                        user: targetUser.username,
                        balance: result.balance,
                        action: t(guild.language || 'en', `commands.modifyBalance.actions.${result.action}`),
                        amount
                    })
                )
                .setColor('#FFD700')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error modifying balance:', error.message);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.modifyBalance.errors.failed'),
                ephemeral: true
            });
        }
    }
};
