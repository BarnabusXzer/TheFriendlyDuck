const { Guild, Role } = require('discord.js');

/**
 * Creates one or many roles
 * @param {String[]} roles - list of roles that will be created
 * @param {Guild} guild - the guild that the roles will be added to
 * @returns {void}
 */
function createRoles(roles,guild) {

    currentRoles = guild.roles.cache.values();
    currentRoleNames = [];

    for (let value of currentRoles){
        currentRoleNames.push(value.name);
    }

    for (let i = 0; i < roles.length; i++) {
        if (!currentRoleNames.includes(roles[i])) {
            try {
                guild.roles.create({
                    name: roles[i],
                    mentionable: true,
                });
            } catch (error) {
                console.error(`Unable to create role ${roles[i]}`);
                console.error(error);            }
        }
    }
}

module.exports = { createRoles };