// CONFIGURE AND DEPLOY THE EXPRESS SERVER FOR API

require('dotenv').config({path:'./src/configs/.env'});

const express = require('express');
const http = require('http');

const app = express();
const port = 8080;

// ROUTERS
// CALL ROUTES
const dummyRoutes = require("./routes/dummy");

// INITIATE ROUTERS
app.use('/', dummyRoutes); // USES THE DUMMY.JS ROUTE WHEN HOSTNAME:8080/DUMMY/ IS REQUESTED

http.createServer(app).listen(port, () => {
  console.log(`ThePlaygroundBot is listening on port ${port}`);
});

require('dotenv').config({path:'./src/configs/.env'});

////////////////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURE AND DEPLOY THE DISCORD BOT

// CONFIGURE AND SET UP SLASH COMMANDS
const {Client, GatewayIntentBits, Events, Collection} = require('discord.js');
const fs = require('node:fs'); // fs is used to read the commands directory and identify our command files.
const path = require('node:path'); // path helps construct paths to access files and directories

const client = new Client({intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.MessageContent
]});
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// SLASH COMMAND HANDLER 
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// EVENT AND INTERACTION HANDLER
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// BEGIN AND LOGIN THE BOT
client.login(process.env.TOKEN);