const { models } = require('../models/index');

const addRoleCondition = async (guildId, roleId, conditionType, conditionValue) => {
    return await models.RoleConditions.create({
        guild_id: guildId,
        role_id: roleId,
        condition_type: conditionType,
        condition_value: conditionValue || null,
        is_active: true
    });
};

const removeRoleCondition = async (guildId, roleId, conditionType) => {
    return await models.RoleConditions.destroy({
        where: { guild_id: guildId, role_id: roleId, condition_type: conditionType }
    });
};

const evaluateRoleConditions = async (guild, member, conditionType, conditionValue) => {
    const roleConditions = await models.RoleConditions.findAll({
        where: { guild_id: guild.id, condition_type: conditionType, is_active: true }
    });

    for (const condition of roleConditions) {
        const role = guild.roles.cache.get(condition.role_id);
        if (!role) continue;

        const satisfiesCondition = conditionValue >= condition.condition_value;
        const hasRole = member.roles.cache.has(role.id);

        if (satisfiesCondition && !hasRole) {
            await member.roles.add(role, `Condition met: ${conditionType}`);
        } else if (!satisfiesCondition && hasRole) {
            await member.roles.remove(role, `Condition no longer met: ${conditionType}`);
        }
    }
};

module.exports = { addRoleCondition, removeRoleCondition, evaluateRoleConditions };
