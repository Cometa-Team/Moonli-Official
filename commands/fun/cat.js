const Discord = require("discord.js")
const api = require("node-fetch")

module.exports = {
  name: 'cat',
  category: 'fun',
  async execute(client, message, args) {
    let res = api("https://some-random-api.ml/img/cat")
        .then(res => res.json())
        .then(json => {
          const embed = new Discord.MessageEmbed()
          .setTitle("Кот")
          .setColor(0x000000)
          .setImage(json.link)
          .setTimestamp()
          message.channel.send(embed)
        })
  }
}