const simplydjs = require('simply-djs')
const Discord = require("discord.js")

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "all commands of bot",


  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle('**Test**')
      .setDescription('**Test**')
      .addField("**Test**")

    let embed2 = new Discord.MessageEmbed()
      .setTitle('**Test**')
      .setDescription('**Test**')
      .addField("**Test**")

    let pages = [embed, embed2] // REQUIRED

    // its still possible without embed
    // let pages = ['page1', 'page2', 'page3']

    simplydjs.embedPages(client, message, pages, {
      firstEmoji: '', // default: ⏪
      backEmoji: '', // default: ◀️
      delEmoji: '', // default: 🗑️
      forwardEmoji: '', // default: ▶️
      lastEmoji: '', // default: ⏩

      btncolor: 'grey', // default: green 
      delcolor: 'red', // default: red
      skipcolor: 'grey', // default: blurple
      // Colors that discord-buttons support. like red, blurple, grey, green

      skipBtn: true,
    })
  }
}
