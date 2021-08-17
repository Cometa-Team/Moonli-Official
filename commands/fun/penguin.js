const { MessageEmbed } = require("discord.js")
const api = require("node-fetch")

module.exports = {
  name: 'penguin',
  category: 'fun',
  async execute(client, message, args) {
    let res = api("https://some-random-api.ml/img/penguin")
        .then(res => res.json())
        .then(json => {
          const embed = new MessageEmbed()
          .setTitle("Пингвин")
          .setColor(0x000000)
          .setImage(json.link)
          .setTimestamp()
          message.channel.send({ embeds: [embed] })
        })
  }
}
