const Discord = require('discord.js')
const { version } = require('../../package.json')
const { version: discordjsVersion } = require('discord.js')
const ms = require('pretty-ms');
const { author } = require('../../package.json');

module.exports = {
  name: "bot",
  description: "Информация о боте",
  category: "information",
  async execute(client, message, args) {
    let members = client.guilds.cache.members
    let adm = client.users.cache.get("852984192421199923")
    let user = message.author;
      let bot = new Discord.MessageEmbed()
      .setColor(client.color)
      .setTitle(`Версия бота: ${version}`)
      .setDescription(`Автор бота: ${author} \nЕго тег ${adm.tag}`)
      .addField('Бот в сети:', `${ms(client.uptime)}`,true)
      .addField('Нагрузка на бота:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`,true)
      .addField('Пинг:', `${client.ws.ping} ms`,true)
      .addField('Всего гильдий:', `${client.guilds.cache.size}`,true)
      .addField('Всего юзеров:', `${client.users.cache.size}`,true)
      .addField('Всего команд:', `${client.commands.size}`,true)
      .addField('Node js:', `${process.version} на ${process.platform} ${process.arch}`,true)
      .addField('Библиотека Djs', `${discordjsVersion}`,true)
      message.reply({ embeds: [bot] })
 }
}
