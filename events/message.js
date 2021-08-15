const config = require("../config.json");
const configdev = config.developers;
global.mongoose = require('mongoose');
global.Guild = require("../data/guild.js");
global.User = require('../data/user.js');
const uri = config.mongodb;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅] База Данных подключена!')
})
module.exports = {
	name: 'message',
	once: false,
	async execute(message, client) {
	    
	    if(message.author.bot) return;
	    
	    client.nodb = (user) => message.channel.send(new Discord.MessageEmbed().setColor(0x0000ff).setDescription(`К сожелению **${user.tag}** нету в базе-данных.`));
            let webhooks = require("./webhooks.json")
            let newGuildHook = await new Discord.WebhookClient(webhooks["MDBWebhook"]["id"],
							       webhooks["MDBWebhook"]["token"])
            let newGuildHook1 = await new Discord.WebhookClient(webhooks["DBCWebhook"]["id"],
								webhooks["DBCWebhook"]["token"])
            let MongoDBU = await new Discord.MessageEmbed().setTitle("Доабвление участника в Базу Данных").setDescription(`\`[✅ База Данных]\` **${message.author.username}** Успешно был(а) добавлен(а) в бд на сервере ${message.guild.name}!`).setTimestamp()
            let MongoDBG = await new Discord.MessageEmbed().setTitle("Добавление сервера(гильдии) в Базу Данных").setDescription(`\`[✅ База Данных]\` **${message.guild.name}** Успешно была добавлена в бд!`).setTimestamp()
	    let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
            let cooldowns = client.cooldowns;
	    let guild = await Guild.findOne({ guildID: message.guild.id });
	    if(!user) { User.create({ guildID: message.guild.id, userID: message.author.id }); newGuildHook.send({embed:[MongoDBU]}) }
	    if(!guild) { Guild.create({ guildID: message.guild.id }); newGuildHook.send({embed:[MongoDBG]}) }   
	    
	    let random = Math.floor(Math.random() * 5)
	    user.money += random;
       user.xp++
       user.messages++
      
        if(user.xp >= config.upXP){
        let embed = new Discord.MessageEmbed()
        .setColor(0x0000ff)
        .setDescription(`[:tada:] Поздравим **${message.author.username}** с новым уровнем!`)
        message.channel.send(embed)
        user.xp -= config.upXP;
        user.level+=1
      }
      
      user.save();
      
      if (!message.content.startsWith(guild.prefix)) return;
      const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
      if (!command) return;
      if(message.channel.type === 'dm') {
        return newGuildHook1.send(
          new Discord.MessageEmbed()
          .setTitle('Лс с ботом')
          .setColor(0x0000ff)
          .setDescription(message.content)
          .setTimestamp()
        )
      }
      if (command.args && !args.length) {
        let reply = `Вы не правильно написали, ${message.author}!\n\n`;
        if (command.usage) {
          reply += `Правильное использование команды: \`${guild.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
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
          return message.reply(`Пожалуйста, подожди еще ${timeLeft.toFixed(1)} секунд(ы) прежде чем использовать команду \`${command.name}\``);
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
      let DBC = new Discord.MessageEmbed().setAuthor(client.user.username, client.user.avatarURL()).setTitle(`> База Данных  *|* Команда  ${command.name}`).setDescription(`Информация:`).addField('User:', `ID: \`${message.author.id}\`\nTag: **${message.author.tag}**\nCommand: **${command.name}**\nPrefix: **${guild.prefix}**`).addField('Server:', `ID: \`${message.guild.id}\`\nName: **${message.guild.name}**`).setColor(0x363940).setFooter(message.author.tag, message.author.avatarURL()).setThumbnail(message.guild.iconURL())
      if(message.content === `${guild.prefix}${command.name}`) {
        newGuildHook1.send({ embed:[DBC] })
      }
  }
}
