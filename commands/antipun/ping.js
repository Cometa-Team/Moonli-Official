const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Пинг бота",
  async execute(client, message, args) {
    let embed = Discord.MessageEmbed()
    .setTitle("Пинг")
    .setDescription(`${client.ws.ping} Мой пинг`)
    .setTimestamp()
    message.channel.send(embed)
 }
}
