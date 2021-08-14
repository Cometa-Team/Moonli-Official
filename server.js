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

client.on("messageCreate", message => {
  console.log('Эвент messageCreate запущен!')
  if(message.author.bot) return;
  
  if (!message.content.startsWith(config.prefix)) return;
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
      if (!command) return;
      if (command.args && !args.length) {
        let reply = `Вы не правильно написали, ${message.author}!\n\n`;
        if (command.usage) {
          reply += `Правильное использование команды: \`${guild.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send({ content: reply });
      }
      if(!configdev.includes(message.author.id) && command.admin == true) {
        console.log(`${message.author.tag} пытался использовать admin команду!`);
        return message.react('❌');
      }
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 5) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send({ content: `Пожалуйста, подожди еще ${timeLeft.toFixed(1)} секунд(ы) прежде чем использовать команду \`${command.name}\`` });
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try {
        command.execute(client, message, args, command);
      } catch (error) {
        console.error(error);
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Ошибка!")
        .setDescription(`\`\`\`` + error + `\`\`\``)
        .setColor(client.colors.error))
        console.log('Ошибка у бота!');
      }
});

client.login(config.token);
