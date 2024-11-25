const { addRoleCondition, removeRoleCondition } = require('../../utils/roleConditionHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'setrole',
        description: (lang) => t(lang, 'commands.setrole.description'),
        options: (lang) => [
            {
                name: 'role',
                type: 'ROLE',
                description: t(lang, 'commands.setrole.options.role'),
                required: true
            },
            {
                name: 'condition',
                type: 'STRING',
                description: t(lang, 'commands.setrole.options.condition'),
                required: true,
                choices: [
                    { name: t(lang, 'commands.setrole.conditions.onJoin'), value: 'onJoin' },
                    { name: t(lang, 'commands.setrole.conditions.messageCount'), value: 'messageCount' },
                    { name: t(lang, 'commands.setrole.conditions.reactionCount'), value: 'reactionCount' },
                    { name: t(lang, 'commands.setrole.conditions.boostServer'), value: 'boostServer' }
                ]
            },
            {
                name: 'value',
                type: 'INTEGER',
                description: t(lang, 'commands.setrole.options.value'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const condition = interaction.options.getString('condition');
        const value = interaction.options.getInteger('value');
        const { guild, guildId } = interaction;

        if (condition !== 'onJoin' && (!value || value <= 0)) {
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.setrole.errors.invalidValue'),
                ephemeral: true
            });
            return;
        }

        try {
            await addRoleCondition(guildId, role.id, condition, value);

            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.setrole.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.setrole.successDescription', {
                        role: role.name,
                        condition: t(guild.language || 'en', `commands.setrole.conditions.${condition}`),
                        value: value || t(guild.language || 'en', 'commands.setrole.values.none')
                    })
                )
                .setColor('#4CAF50')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error setting role condition:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.setrole.errors.failed'),
                ephemeral: true
            });
        }
    }
};
