const { updateWelcomeSetting } = require('../../utils/messageSettingsHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'set3',
        description: (lang) => t(lang, 'commands.set3.description'),
        options: (lang) => [
            {
                name: 'welcome',
                type: 'SUB_COMMAND_GROUP',
                description: t(lang, 'commands.set3.welcome.description'),
                options: [
                    {
                        name: 'message',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set3.welcome.message.description'),
                        options: [
                            {
                                name: 'message',
                                type: 'STRING',
                                description: t(lang, 'commands.set3.welcome.message.options.message'),
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'channel',
                        type: 'SUB_COMMAND',
                        description: t(lang, 'commands.set3.welcome.channel.description'),
                        options: [
                            {
                                name: 'channel',
                                type: 'CHANNEL',
                                description: t(lang, 'commands.set3.welcome.channel.options.channel'),
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
                await updateWelcomeSetting(guildId, 'welcome_message', message);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set3.welcome.message.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set3.welcome.message.successDescription', {
                            message
                        })
                    )
                    .setColor('#00AAFF');

                await interaction.reply({ embeds: [embed] });
            } else if (subCommand === 'channel') {
                const channel = interaction.options.getChannel('channel');
                await updateWelcomeSetting(guildId, 'welcome_channel', channel.id);

                const embed = new EmbedBuilder()
                    .setTitle(t(interaction.guild.language || 'en', 'commands.set3.welcome.channel.successTitle'))
                    .setDescription(
                        t(interaction.guild.language || 'en', 'commands.set3.welcome.channel.successDescription', {
                            channel: channel.name
                        })
                    )
                    .setColor('#00AAFF');

                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error updating welcome settings:', error);
            await interaction.reply({
                content: t(interaction.guild.language || 'en', 'commands.set3.welcome.errors.failed'),
                ephemeral: true
            });
        }
    }
};
