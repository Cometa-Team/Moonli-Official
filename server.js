const { Discord, Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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
  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.mongo.close())

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

client.login(config.token);
