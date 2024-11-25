const { updateLeaveSetting } = require('../../utils/messageSettingsHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'set2',
        description: (lang) => t(lang, 'commands.set2.description'),
        options: (lang) => [
            {
                name: 'leave',
                type: 'SUB_COMMAND_GROUP',
                description: t(lang, 'commands.set2.leave.description'),
                options: [
                    {
                        name: 'message',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set2.leave.message.description'),
                        options: [
                            {
                                name: 'message',
                                type: 'STRING',
                                description: t(lang, 'commands.set2.leave.message.options.message'),
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'channel',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set2.leave.channel.description'),
                        options: [
                            {
                                name: 'channel',
                                type: 'CHANNEL',
                                description: t(lang, 'commands.set2.leave.channel.options.channel'),
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();
        const guildId = interaction.guildId;

        try {
            if (subCommand === 'message') {
                const message = interaction.options.getString('message');
                await updateLeaveSetting(guildId, 'leave_message', message);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set2.leave.message.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set2.leave.message.successDescription', {
                            message
                        })
                    )
                    .setColor('#FF6347');

                await interaction.reply({ embeds: [embed] });
            } else if (subCommand === 'channel') {
                const channel = interaction.options.getChannel('channel');
                await updateLeaveSetting(guildId, 'leave_channel', channel.id);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set2.leave.channel.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set2.leave.channel.successDescription', {
                            channel: channel.name
                        })
                    )
                    .setColor('#FF6347');

                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error updating leave settings:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.set2.leave.errors.failed'),
                ephemeral: true
            });
        }
    }
};
