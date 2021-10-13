const config = require("../config.json");
const configdev = config.developers;
const { Collection, MessageEmbed } = require('discord.js');
//global.Guilds = require("./mongoose-schema/guilds.js");
//global.Users = require("./mongoose-schema/users.js");

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {
      
      if(message.author.bot) return;
	    
      let cooldowns = client.cooldowns;
      if (!message.content.startsWith(client.config.prefix)) return;
      const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
      if (!command) return;
      //if(message.channel.type === 'dm') {
        //return newGuildHook1.send(
          //new Discord.MessageEmbed()
          //.setTitle('Лс с ботом')
          //.setColor(0x0000ff)
          //.setDescription(message.content)
          //.setTimestamp()
        //)
      //}
      if (command.args && !args.length) {
        let reply = `Вы не правильно написали, ${message.author}!\n\n`;
        if (command.usage) {
          reply += `Правильное использование команды: \`${config.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send({ content: reply });
      }
      //client.nodb = (user) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`К сожелению **${user.tag}** нету в базе-данных.`));

      //let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
      //let guild = await Guild.findOne({ guildID: message.guild.id });
      //if(!user) { User.create({ guildID: message.guild.id, userID: message.author.id }); send(`\`[✅ DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`) }
      //if(!guild) { Guild.create({ guildID: message.guild.id }); send(`\`[✅ DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`); }   
      if(!configdev.includes(message.author.id) && command.admin == true) {
        console.log(`${message.author.tag} пытался использовать admin команду!`);
        return message.react('❌');
      }
      let debug = new MessageEmbed()
        .setTitle(`Debug`)
        .setDescription(`Command is off!`)
      if (!command.debugcmd == true) {
        console.log(`${message.author.id} пытался ввести команду, которая в дебаге`)
        message.channel.send({ embeds: [debug] })
        return message.react('❌');
      }
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 5) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply({ content: `Пожалуйста, подожди еще ${timeLeft.toFixed(1)} секунд(ы) прежде чем использовать команду \`${command.name}\``});
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try {
        command.execute(client, message, args, command);
      } catch (error) {
        console.error(error);
        message.channel.send(new MessageEmbed()
        .setTitle("Ошибка!")
        .setDescription(`\`\`\`` + error + `\`\`\``)
        .setColor(client.colors.error))
        console.log('Ошибка у бота!');
      }
  }
}
