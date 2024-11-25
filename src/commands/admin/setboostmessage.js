const { updateBoostSetting } = require('../../utils/messageSettingsHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'set',
        description: (lang) => t(lang, 'commands.set.description'),
        options: (lang) => [
            {
                name: 'boost',
                type: 'SUB_COMMAND_GROUP',
                description: t(lang, 'commands.set.boost.description'),
                options: [
                    {
                        name: 'message',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set.boost.message.description'),
                        options: [
                            {
                                name: 'message',
                                type: 'STRING',
                                description: t(lang, 'commands.set.boost.message.options.message'),
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'channel',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set.boost.channel.description'),
                        options: [
                            {
                                name: 'channel',
                                type: 'CHANNEL',
                                description: t(lang, 'commands.set.boost.channel.options.channel'),
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
                await updateBoostSetting(guildId, 'boost_message', message);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set.boost.message.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set.boost.message.successDescription', {
                            message
                        })
                    )
                    .setColor('#FF69B4');

                await interaction.reply({ embeds: [embed] });
            } else if (subCommand === 'channel') {
                const channel = interaction.options.getChannel('channel');
                await updateBoostSetting(guildId, 'boost_channel', channel.id);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set.boost.channel.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set.boost.channel.successDescription', {
                            channel: channel.name
                        })
                    )
                    .setColor('#FF69B4');

                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error updating boost settings:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.set.boost.errors.failed'),
                ephemeral: true
            });
        }
    }
};
