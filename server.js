const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [
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
]
});
const fs = require('fs');
global.mongoose = require('mongoose')

client.config = require('./config.json');
client.commands = new Collection();
client.cooldowns = new Collection();
client.errors = require('./data/errors.json');
client.emotes = require("./data/emojis.json");
client.colors = require("./data/colors.json");
//client.shards = new ShardingManager("./shards.js");
client.aliases = new Collection();
client.cache = {
  reactions: new Map()
}

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

mongoose.connect(client.config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅ DataBase] Connected!')
})

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '884764512014700554';
const guildId = message.guild.id

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.login(client.config.token)
