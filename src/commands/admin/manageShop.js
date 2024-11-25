const { addItemToShop } = require('../../utils/shopHelper');
const { t } = require('../../utils/locale');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'shop',
        description: (lang) => t(lang, 'commands.shop.add.description'),
        options: (lang) => [
            {
                name: 'action',
                type: 'STRING',
                description: t(lang, 'commands.shop.add.options.action'),
                required: true,
                choices: [{ name: 'add', value: 'add' }]
            },
            {
                name: 'name',
                type: 'STRING',
                description: t(lang, 'commands.shop.add.options.name'),
                required: true
            },
            {
                name: 'price',
                type: 'INTEGER',
                description: t(lang, 'commands.shop.add.options.price'),
                required: true
            },
            {
                name: 'stock',
                type: 'INTEGER',
                description: t(lang, 'commands.shop.add.options.stock'),
                required: true
            },
            {
                name: 'role',
                type: 'ROLE',
                description: t(lang, 'commands.shop.add.options.role'),
                required: false
            },
            {
                name: 'description',
                type: 'STRING',
                description: t(lang, 'commands.shop.add.options.description'),
                required: false
            }
        ]
    },
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const name = interaction.options.getString('name');
        const price = interaction.options.getInteger('price');
        const stock = interaction.options.getInteger('stock');
        const role = interaction.options.getRole('role');
        const description = interaction.options.getString('description');
        const { guildId, guild } = interaction;

        // Check for "add" action
        if (action !== 'add') {
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.shop.add.errors.invalidAction'),
                ephemeral: true
            });
            return;
        }

        try {
            // Add item to the shop using the utility function
            const newItem = await addItemToShop(
                guildId,
                name,
                price,
                stock,
                role ? role.id : null,
                description || null
            );

            // Embed response
            const embed = new EmbedBuilder()
                .setTitle(t(guild.language || 'en', 'commands.shop.add.successTitle'))
                .setDescription(
                    t(guild.language || 'en', 'commands.shop.add.successDescription', {
                        name: newItem.name,
                        price: newItem.price,
                        stock: newItem.stock === 0
                            ? t(guild.language || 'en', 'commands.shop.add.unlimitedStock')
                            : newItem.stock,
                        role: role ? role.name : t(guild.language || 'en', 'commands.shop.add.noRole'),
                        description: newItem.description || t(guild.language || 'en', 'commands.shop.add.noDescription')
                    })
                )
                .setColor('#00AAFF')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error adding shop item:', error);
            await interaction.reply({
                content: t(guild.language || 'en', 'commands.shop.add.errors.failed'),
                ephemeral: true
            });
        }
    }
};
