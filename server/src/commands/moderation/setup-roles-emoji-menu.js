const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-roles-emoji-menu')
        .setDescription('Sends role selction menu and creates roles')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('short message above selection menu')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('roles')
                .setDescription('list of roles to create')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('the channel to echo into')
                .setRequired(true)),

    async execute(interaction) {

        // PARSE JSON THAT IS THE ROLE SELECTION MENU MESSAGE

        // await interaction.reply();



        // CREATE ROLES

        

    },
};