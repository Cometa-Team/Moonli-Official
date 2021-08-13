const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require('fs');
const config = require('./config.json');
const { MongoClient } = require('mongodb')
const url = "mongodb+srv://MongoDB:MINICAT2019@cluster0.ssaj6.mongodb.net/AntiCrashBot?retryWrites=true&w=majority";

client.commands = new Collection();
client.cooldowns = new Collection();
client.errors = require('./data/errors.json');
client.emotes = require("./data/emojis.json");
client.colors = require("./data/colors.json");
client.aliases = new Collection();
client.mongo = new MongoClient(url)

const dbName = 'AntiCrash'

async function main() {
  await client.mongo.connect()
  console.log('Подключение к Базе Данных прошло успешно!')
  const db = client.mongo.db(dbName)
  const collection = db.collection('AntiCrash')
  return 'Подключено!'
}

main()
  .then(console.log)
  .catch(console.error)

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(`${folder} Загружено, ${file} Загружено!`)
	}
}

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
  name: 'ping',
  description: 'Replies with Pong!'
}]; 

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.login(config.token);
