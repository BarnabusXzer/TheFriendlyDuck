const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-roles-select-menu')
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
        interaction.isButton

        console.log(interaction.client.user);
        console.log(interaction.guild);
        console.log(interaction.user);

        console.log(interaction.options.get('message'));
        console.log(interaction.options.get('roles'));
        console.log(interaction.options.get('channel'));

        // await interaction.reply();



        // CREATE ROLES

        

    },
};
