const { ButtonInteraction, Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ButtonInteraction} interaction
     * @returns {void}
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId.slice(0,9) !== 'TFDRLBTN-') return;

        //THIS IS A TEMP FILE FOR THE-PLAYGROUND-SERVER SO I WILL JUST HARD CODE THE ROLE-GROUP HERE
        // '1113713122373545984','1113713123782836285','1113713124588146688','1113713125280202752'
        const roleGroup = ['1114034960085549087','1114034960370782239','1114034961339650129'];

        try {
            const roleName = interaction.customId.substring(9);
            const role = (interaction.guild.roles.cache.findKey(key => key.name === `${roleName}`)); // THIS IS THE ID OF THE ROLE REPRESENTED AS A STRING BECAUSE THE ID IS TOO LONG FOR JAVASCRIPT INTEGERS
            const memberRoles = interaction.member._roles;

            if (roleGroup.includes(role)) {
                for(let i = 0; i < roleGroup.length; i++) {
                    if (memberRoles.includes(roleGroup[i]) && roleGroup[i] !== role) {
                        const removeRole = interaction.guild.roles.cache.findKey(key => key.id == roleGroup[i]);
                        interaction.member.roles.remove(removeRole);
                    } 
                }
            }

        } catch (error) {
            if (error.code === 50006) {
                //DO NOTHING
            } else {
                console.error(error);
            }
        }
    }
}
