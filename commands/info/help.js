const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "help",
  description: "Хелп бота",
  category: "info",
  async execute(client, message, args) {
    const help = new MessageEmbed()
    .setTitle("Хелп")
    .setColor(client.color)
    .setDescription("Fun: cat, dog, fox, panda\nEconomy: work, profile, leaderboard")
    .setTimestamp()
    message.channel.send({ embeds: [help] })
  }
}