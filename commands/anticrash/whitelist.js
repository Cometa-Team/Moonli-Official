const Discord = require("discord.js");

module.exports = {
    name: "whitelist",
    description: "Добавить в Белый Список, чтобы бот вас игнорировал вас",
    async execute(client, message, args) {
        client.mongo.db('AntiCrash').collection('AntiCrash').updateOne({ id: message.author.id }, { $set: { whitelist: 'on' }}, { upsert: true })
        let embed = new Discord.MessageEmbed()
        .setTitle("Вайтлист")
        .setColor(0x00ff09)
        .setDescription("Вы успешно добавили участника в белый список")
        message.channel.send(embed)
    }
}