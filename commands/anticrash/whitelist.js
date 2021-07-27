const Discord = require("discord.js");

module.exports = {
    name: "whitelist",
    description: "Добавить в Белый Список, чтобы бот вас игнорировал вас",
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Вайтлист")
        .setColor(0x00ff09)
        .setDescription("Скоро...")
        message.channel.send(embed)
    }
}