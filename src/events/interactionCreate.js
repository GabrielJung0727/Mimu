const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const interactionType = interaction.isButton()
            ? 'buttons'
            : interaction.isModalSubmit()
            ? 'modals'
            : interaction.isSelectMenu()
            ? 'selects'
            : null;

        if (!interactionType) return;

        if (!interaction.guild) return;
        await fetchPremiumMembers(interaction.guild);

        const interactionFile = path.resolve(__dirname, interactionType, `${interaction.customId}.js`);
        if (fs.existsSync(interactionFile)) {
            const handler = require(interactionFile);
            await handler.execute(interaction);
        }
    },
};
