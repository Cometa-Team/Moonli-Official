module.exports = {
  name: "user",
  description: "",
  async execute(client, message, args) {
    
    let user = message.mentions.users.first() || message.author
    
    let userinfo = {
      avatar: user.avatarURL(),
      name: user.username,
      discrim: `#${user.discriminator}`,
      id: user.id,
      status: user.presence.status,
      bot: user.bot,
      createdAt: user.createdAt
    }
    
    let embed = new Discord.MessageEmbed()
    .setTitle("**Userinfo**")
    .setColor(client.color)
    .setThumbnail(userinfo.avatar)
    .addField("**Username**: ",userinfo.name, true)
    .addField("**Tag**: ",userinfo.discrim, true)
    .addField("**Id**: ",userinfo.id, true)
    .addField("**Status**: ",userinfo.status, true)
    .addField("**Bot**: ",userinfo.bot, true)
    .addField("**createdAt**: ",userinfo.createdAt, true)
    .setTimestamp()
    
    message.channel.send(embed);
  }
}