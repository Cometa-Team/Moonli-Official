const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
  	Intents.FLAGS.GUILD_MEMBERS,
  	Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	  Intents.FLAGS.GUILD_INTEGRATIONS,
  	Intents.FLAGS.GUILD_WEBHOOKS,
  	Intents.FLAGS.GUILD_INVITES,
	  Intents.FLAGS.GUILD_VOICE_STATES,
   	Intents.FLAGS.GUILD_PRESENCES,
	  Intents.FLAGS.GUILD_MESSAGES,
  	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  	Intents.FLAGS.GUILD_MESSAGE_TYPING,
  	Intents.FLAGS.DIRECT_MESSAGES,
  	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	  Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
});
const fs = require('fs');

client.config = require('./config.json');
client.commands = new Collection();
client.cooldowns = new Collection();
client.emotes = require("./data/emojis.json");
client.color = 0x00ff00
//client.shards = new ShardingManager("./shards.js"); //shards
client.aliases = new Collection();

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

client.login(process.env.token).Base64.encode
