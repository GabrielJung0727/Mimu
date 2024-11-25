const { models } = require('../../models/index');
const { evaluateRoleConditions } = require('../../utils/roleConditionHelper');

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        if (user.bot) return;

        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        if (!member) return;

        const [userData, created] = await models.ServerUserData.findOrCreate({
            where: { guild_id: guild.id, user_id: user.id },
            defaults: { reaction_count: 1 }
        });

        if (!created) {
            await userData.increment('reaction_count');
        }

        const reactionCount = userData.reaction_count + 1;

        await evaluateRoleConditions(guild, member, 'reactionCount', reactionCount);
    }
};
