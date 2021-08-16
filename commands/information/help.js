const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json')

module.exports = {
	name: 'help',
	description: 'Команды бота',
	category: 'user',
	async execute(client, message, args) {
        if(!args[0]) {
          let data = await Guild.findOne({ guildID: message.guild.id })
          let prefix = `${data.prefix}`
          const user = client.commands.filter(c => c.category === "user").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
          const admin = client.commands.filter(c => c.category === "admin").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
          let embed = new Discord.MessageEmbed()
          .setTitle(`Команды`)
          .setColor(0x0000FF)
          .setDescription(`<a:12e:798951679281070091> - рабочие команды, <a:11e:798951647744229436> - не рабочие команды. Узнать информацию о команде: ${data.prefix}help <команда>(Команду без <> указывать!).
<a:12e:798951679281070091> - 🏞️|Команды для участников:
${user} 
<a:12e:798951679281070091> - 👮|Админ команды:
${admin}`)
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

SlashCommand: {
  run: async (client, interaction, args, { GuildDB }) => {
    let data = await Guild.findOne({ guildID: message.guild.id, prefix: config.bot.prefix })
    let prefix = `${data.prefix}`
    const user = client.commands.filter(c => c.category === "user").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
    const admin = client.commands.filter(c => c.category === "admin").map(c => `**${prefix}${c.name}** - ${c.description}`).join("\n") || 'Нет'
    let embed = new Discord.MessageEmbed()
    .setTitle(`Команды`)
    .setColor(0x0000FF)
    .setDescription(`<a:12e:798951679281070091> - рабочие команды, <a:11e:798951647744229436> - не рабочие команды. Узнать информацию о команде: ${data.prefix}help <команда>(Команду без <> указывать!).
<a:12e:798951679281070091> - 🏞️|Команды для участников:
${user} 
<a:12e:798951679281070091> - 👮|Админ команды:
${admin}`)
    message.channel.send(embed)
  }
}