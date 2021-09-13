const { MessageEmbed } = require("discord.js")
const api = require("node-fetch")

module.exports = {
  name: 'panda',
  category: 'fun',
  async execute(client, message, args) {
    let res = api("https://some-random-api.ml/img/panda")
        .then(res => res.json())
        .then(json => {
          const embed = new MessageEmbed()
          .setTitle("Панда")
          .setColor(0x311432)
          .setImage(json.link)
          .setTimestamp()
          message.channel.send({ embeds: [embed] })
        })
  }
}
