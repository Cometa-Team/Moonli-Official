const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: "secret",
    description: "Секрет",
    admin: true,
    async execute(client, message, args) {
        let cb = new MessageEmbed()
        .setTitle("Плюшки в боте")
        .setDescription("Нету, [Вступи](https://discord.gg/5xJW8BU9VH) на сервер поддержки!!!")
        .setTimestamp()
        message.channel.send({ embeds: [cb] })
    }
}
