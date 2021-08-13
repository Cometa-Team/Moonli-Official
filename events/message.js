const config = require('.././config.json');
const configdev = config.developers;
const Discord = require("discord.js");

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {
	    
	    if(message.author.bot) return;

       let cooldowns = client.cooldowns;
       if (!message.content.startsWith(config.prefix)) return;
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
      //client.mongo.db('AntiCrash').collection('AntiCrash').updateOne({ id: message.author.id }, { $set: { id: message.author.id, whitelist: 'off', badges: [], money: '0' }}, { upsert: true })
      if (!command) return;
      if (command.guildOnly && message.channel.type !== 'dm') {
        return message.channel.send(content: 'Команды нельзя писать в лс!');
      }
      if (command.args && !args.length) {
        let reply = `Вы не правильно написали, ${message.author}!\n\n`;
        if (command.usage) {
          reply += `Правильное использование команды: \`${config.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(content: reply);
      }
      if(!configdev.includes(message.author.id) && command.admin == true) {
        console.log(`${message.author.onntag} пытался использовать admin команду!`);
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
          return message.channel.send(content: `Пожалуйста, подожди еще ${timeLeft.toFixed(1)} секунд(ы) прежде чем использовать команду \`${command.name}\``);
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
      
      if(message.content === `${config.prefix}${command.name}`) {
        if(message.author.id === "720997951119425576") return
        client.channels.cache.get("799935806323818506").send(new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle(`> База Данных  *|* Команда  ${command.name}`)
        .setDescription(`Информация:`)
        .addField('User:', `ID: \`${message.author.id}\`\nTag: **${message.author.tag}**\nCommand: **${command.name}**\nPrefix: **${guild.prefix}**`)
        .addField('Server:', `ID: \`${message.guild.id}\`\nName: **${message.guild.name}**`)
        .setColor(0x363940)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setThumbnail(message.guild.iconURL()))
      } 
    }
	
}
