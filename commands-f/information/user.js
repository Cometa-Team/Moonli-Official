const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "user",
  description: "",
  async execute(client, message, args) {

    let user = message.mentions.users.first() || message.author

    let userm = new MessageEmbed()
      .setTitle("**Userinfo**")
      .setColor(client.color)
      .setThumbnail(user.avatarURL())
      .setDescription(`**Username**: ${user.username}\n**Tag**: #${user.discriminator}\n**Id**: ${user.id}\n**Status**: ${user.presence.status}\n**Bot**: ${user.bot}\n**createdAt**: ${user.createdAt}`)
      .setTimestamp()

    message.channel.send({ embeds: [userm] });
  }
}
