const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    description: "Посмотреть свой или чжой профиль",
    async execute(client, message, args) {
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let embed = new MessageEmbed()
        .setTitle("Информация о пользователе")
        .setColor(0x311432)
        .setDescription(`Имя: ${message.author.username}
Айди: ${message.author.id}
Тег: ${message.author.discriminator}
Биткойны: ${user.bitcoin}
Дон. Биткойны: ${user.donbitcoin}
Премиум: ${user.premium}
Сообщения: ${user.messages}
`)
        message.reply({ embeds: [embed] });
    }
}
