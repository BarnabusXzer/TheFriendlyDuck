const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChatInputCommandInteraction } = require("discord.js");
const{ createRoles } = require('../../utils/create-roles.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-roles-button-menu')
        .setDescription('Creates a role selection using buttons! (This cannot be used for more than 25 roles)')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('short message above selection menu')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('roles')
                .setDescription('comma seperated list of roles to create a menu for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('button-labels')
                .setDescription('comma seperated list of button labels with respect to the roles list')
                .setRequired(true)),
        /**
         * Responds to the interaction
         * @param {ChatInputCommandInteraction} interaction 
         * @returns {null}
         */
    async execute(interaction) {

        // CREATE MENU

        const roles = (interaction.options.get('roles')).value.split(",");
        const labels = (interaction.options.get('button-labels')).value.split(",");

        let response = [];

        // CHECK THAT THERE IS LESS THAN 26 ROLES
        if (roles.length > 25) {
            const message = (`The button menu type cannot accomidate all ${roles.length} roles that you want to create. The button menu can only display a maximum of 25 roles. Please Use the /setup-roles-select-menu or /setup-roles-emoji-menu to setup a role selection menu for your size. Thanks!`);
            await interaction.reply({ content: message, ephemeral: true });
            return;
        }
        // CKECH THAT THERE IS AN EQUAL NUMBER OF ROLES AND LABELS
        if (roles.length != labels.length) {
            const message = (`There has to be an equal number of roles and labels. Currently, there are ${roles.length} roles and ${labels.length} labels.`);
            await interaction.reply({ content: message, ephemeral: true });
            return;
        }
        // CHECK THAT THE ROLES NAMES ARE NOT TOO LONG INCLUDING THE PREFIX
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].length + 8 > 100) {
                const message = (`Roles cannot contain more than 90 characters, please shorten the name of one or multiple roles. Thank you!`);
                await interaction.reply({ content: message, ephemeral: true });
                return;
            }
        }

        // IF THERE ARE LESS THAN 6 ROLES THEN EACH ROLE WILL GET ITS OWN ROW 
        if (roles.length <= 5) {

            for(let i = 0; i < roles.length; i++) {
            
                const role = roles[i].trim();
                const label = labels[i].trim();
    
                const button = new ButtonBuilder()
                    .setCustomId(`TFDRLBTN-${role}`)
                    .setLabel(label)
                    .setStyle(buttonColor(i));

    
                const row = new ActionRowBuilder()
                    .addComponents(button);
    
                response.push(row);
            }

            createRoles(roles, interaction.member.guild);

        // IF THERE ARE  LESS THAN 25 BUT MORE THAN 5 ROLES THE ROLES WILL BE SPLIT INTO ROWS AND COLUMNS TO LOOK NICER
        } else {

            // CREATES SQUARE ARRAY REPRESENTIGN FINAL BUTTON GRID FILLED WITH ZEROS
            let matrix = new Array(Math.ceil(Math.sqrt(roles.length))).fill(new Array(Math.ceil(Math.sqrt(roles.length))).fill(0));

            index = 0;
            //THESE ARE THE ROWS
            for (let i = 0; i < matrix.length; i++) {

                if (i * matrix.length < roles.length) {

                    const row = new ActionRowBuilder();

                    // THESE ARE THE COLUMNS (IN THIS CASE BUTTONS)
                    for (let j = 0; j < matrix[i].length; j++) {

                        if (index < roles.length) {

                            const role = roles[index];
                            const label = labels[index];
                            
                            const button = new ButtonBuilder()
                                .setCustomId(`TFDRLBTN-${role}`) // GIVES THE BUTTON AN EXTREMELY UNIQUE ID (THE FRIENDLY DUCK ROLE BUTTON))
                                .setLabel(label)
                                .setStyle(buttonColor((i*matrix.length + j)));
        
                            row.addComponents(button);
                            index++;
                        }
                    }
                    response.push(row);
                }
            }
            createRoles(roles, interaction.member.guild);      
        }

        await interaction.reply({
			content: interaction.options.get('message').value,
			components: response,
		});
    }
}

function buttonColor(index) {
    if (index % 4 == 0) {
        return ButtonStyle.Primary    
    };
    if (index % 4 == 1) {
        return ButtonStyle.Danger
    };
    if (index % 4 == 2) {
        return ButtonStyle.Success
    };
    if (index    % 4 == 3) {
        return ButtonStyle.Secondary
    };
}



