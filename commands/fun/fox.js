const { MessageEmbed } = require("discord.js")
const api = require("node-fetch")

module.exports = {
  name: 'fox',
  category: 'fun',
  async execute(client, message, args) {
    let res = api("https://some-random-api.ml/img/fox")
        .then(res => res.json())
        .then(json => {
          const embed = new MessageEmbed()
          .setTitle("Лиса")
          .setColor(client.color)
          .setImage(json.link)
          .setTimestamp()
          message.channel.send({ embeds: [embed] })
        })
  }
}
