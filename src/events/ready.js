const { models } = require('../../models/index');

const checkMutes = async (client) => {
    const now = new Date();
    const activeMutes = await models.Mutes.findAll({
        where: { is_active: true, expires_at: { [Op.lte]: now } }
    });

    for (const mute of activeMutes) {
        const guild = client.guilds.cache.get(mute.guild_id);
        if (!guild) continue;

        const member = guild.members.cache.get(mute.user_id);
        if (!member) continue;

        const muteRole = guild.roles.cache.find(role => role.name === 'Muted');
        if (muteRole) {
            await member.roles.remove(muteRole, 'Mute expired');
        } else {
            await member.timeout(null, 'Mute expired');
        }

        // Update database record
        await models.Mutes.update(
            { is_active: false, unmuted_at: now },
            { where: { id: mute.id } }
        );
    }
};

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Bot is ready!');
        setInterval(() => checkMutes(client), 300000); // Run every 5 minutes
    }
};
