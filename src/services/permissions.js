async function checkUserPermissions(user, requiredPermission) {
    if (!user || !user.permissions) return false;
    return user.permissions.has(requiredPermission);
}

async function hasRole(member, requiredRoleId) {
    if (!member || !member.roles) return false;
    return member.roles.cache.has(requiredRoleId);
}

async function isAdmin(member) {
    return member.permissions.has('Administrator');
}

module.exports = { checkUserPermissions, hasRole, isAdmin };
