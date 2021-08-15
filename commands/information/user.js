const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    description: "Посмотреть свой или чжой профиль",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        .setTitle("Информация о пользователе")
        .setColor(0x00ff09)
        .setDescription("Скоро...")
        message.reply({ embeds: [embed] });
    }
}
