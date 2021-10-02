const simplydjs = require('simply-djs')
const Discord = require("discord.js")

module.exports = {
  name: "help",
  aliases: [""],
  description: "all commands of bot",


  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle('****')
      .setDescription('****')
      .addField("****")

    let embed2 = new Discord.MessageEmbed()
      .setTitle('****')
      .setDescription('****')
      .addField("****")

    let pages = [embed, embed2] // REQUIRED

    // its still possible without embed
    // let pages = ['page1', 'page2', 'page3']

    simplydjs.embedPages(client, message, pages, {
      firstEmoji: '876616705164595280', // default: ⏪
      backEmoji: '876605402291265576', // default: ◀️
      delEmoji: '876627238903246889', // default: 🗑️
      forwardEmoji: '876616590563614781', // default: ▶️
      lastEmoji: '876616351572168765', // default: ⏩

      btncolor: 'grey', // default: green 
      delcolor: 'red', // default: red
      skipcolor: 'grey', // default: blurple
      // Colors that discord-buttons support. like red, blurple, grey, green

      skipBtn: true,
    })
  }
}
