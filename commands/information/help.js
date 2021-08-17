const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json')

module.exports = {
	name: 'help',
	description: 'Команды бота',
	category: 'user',
	async execute(client, message, args) {
        if(!args[0]) {
          let prefix = `${config.prefix}`
          const user = client.commands.filter(c => c.category === "information").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
          //const admin = client.commands.filter(c => c.category === "admin").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
          const fun = client.commands.filter(c => c.category === "fun").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
          let embed = new MessageEmbed()
          .setTitle(`Команды`)
          .setColor(0x0000FF)
          .setDescription(`Узнать информацию о команде: ${data.prefix}help <команда>(Команду без <> указывать!).
Команды для участников:
${information}
Фан команды:
${fun}`)
          message.channel.send(embed)
        }else{
          let cmd = client.commands.get(args[0]);
          if(!cmd) return message.reply("команда не найдена!")
          let helpcmd = new Discord.MessageEmbed()
          .setTitle(`Информация о команде ${args[0]}`)
          .setColor(0x0000ff)
          .setDescription(`Название: ${cmd.name},
Описание: ${cmd.description || 'Нет'},
Алиасы: ${cmd.aliases || 'Нет'},
Использование: ${cmd.usage || 'Нет'},
Категория: ${cmd.category || 'Нет'}`)
          message.channel.send(helpcmd)
        }
 }
}
