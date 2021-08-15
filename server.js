global.Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.config = require('./config.json');
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.errors = require('./data/errors.json');
client.emotes = require("./data/emojis.json");
client.colors = require("./data/colors.json");
client.shards = new Discord.ShardingManager("./shards.js")
client.aliases = new Discord.Collection();
client.cache = {
  reactions: new Map()
}

require("./pysk.js");

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(`${folder} Загружено, ${file} Загружено!`)
	}
}


client.login(client.config.token)

const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)
