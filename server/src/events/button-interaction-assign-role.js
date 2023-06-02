const { ButtonInteraction, Events, Guild } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ButtonInteraction} interaction
     * @returns {void}
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId.slice(0,9) !== 'TFDRLBTN-') return;

        try {
            const roleName = interaction.customId.substring(9);
            const role = interaction.guild.roles.cache.findKey(key => key.name === `${roleName}`) 
            interaction.member.roles.add(role);
            await interaction.reply({
                tts: false
            });

        } catch (error) {
            if (error.code === 50006) {
                //DO NOTHING
            } else {
                console.error(error);
            }
        }
    }
}