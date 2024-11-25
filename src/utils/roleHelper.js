const { models } = require('../models/index');

const assignRole = async (guild, member, roleId, reason) => {
    const role = guild.roles.cache.get(roleId);
    if (role && !member.roles.cache.has(role.id)) {
        await member.roles.add(role, reason);
    }
};

const removeRole = async (guild, member, roleId, reason) => {
    const role = guild.roles.cache.get(roleId);
    if (role && member.roles.cache.has(role.id)) {
        await member.roles.remove(role, reason);
    }
};

const evaluateRoleConditions = async (guild, member, conditionType, conditionValue) => {
    const roleConditions = await models.RoleConditions.findAll({
        where: { guild_id: guild.id, condition_type: conditionType, is_active: true }
    });

    for (const condition of roleConditions) {
        if (conditionValue >= condition.condition_value) {
            await assignRole(guild, member, condition.role_id, `Condition met: ${conditionType}`);
        }
    }
};

module.exports = { assignRole, removeRole, evaluateRoleConditions };
