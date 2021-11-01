const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "profile",
  description: "Профиль участника",
  category: "economy",
  async execute(client,message, args) {

    var msg = message
    let user = msg.mentions.users.first() || msg.author;
    let udb = require("../../db/udb.json");
    let userdb = udb[user.id]
    if(!userdb) return message.channel.send("Я не нашел вашу базу данных", `${user.toString()}`); 

    let profile = new MessageEmbed()
    .setTitle("Профиль")
    .setColor(client.color)
    .setDescription(`Лвл: ${userdb.level}
Монеты: ${userdb.money}
Премиум: ${userdb.premium}`)
    message.channel.send({ embeds: [profile] })
  }
}