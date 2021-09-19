const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "addbot",
  aliases: "add",
  description: "",
  category: "addbot",
  async execute(client, message, args) {
    let add = new MessageEmbed()
    .setTitle("Addbot")
    .setDescription("")
    .setTimestamp()
    message.channel.send({ embeds: [add] })
    let bots = new MessageEmbed()
    .setTitle("Proverka")
    .setDescription("")
    .setTimestamp()
  let msg = await client.channels.cache.get('889176984427589722').send({ embeds: [bots] })
  await msg.react(":white_check_mark:")
  await msg.react("<:add_info:889070526121771008>")
  await msg.react("<:not_accepted:889070410216407040>")
  
  let collector = msg.createReactionCollector(
    (reaction, user) => user.id === message.author.id
    );
    collector.on("collect", async (reaction, user) => {
      if (reaction._emoji.name === ":white_check_mark:") {
        
      }
      if (reaction._emoji.name === "<:add_info:889070526121771008>") {
        
      }
      if (reaction._emoji.name === "<:not_accepted:889070410216407040>") {
        
      }
    })
  }
}
