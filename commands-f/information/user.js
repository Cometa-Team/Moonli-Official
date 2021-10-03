const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "user",
  description: "",
  async execute(client, message, args) {

    let user = message.mentions.users.first() || message.member

    let userm = new MessageEmbed()
    .setTitle("**Userinfo**")
    .setColor(client.color)
    .setThumbnail(user.user.avatar())
    .setDescription(`**Username**: ${user.user.username}\n**Tag**: #${user.user.discriminator}\n**Id**: ${user.id}\n**Status**: ${user.presence.status}\n**Bot**: ${user.user.bot}\n**createdAt**: ${user.user.createdAt}`)
    .setTimestamp()

    message.channel.send({ embeds: [userm] });
  }
}
