const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: "si",
    async execute(client, message, args) {
        let news = message.guild.publicUpdatesChannelId || 'Нету'
        let embed = new MessageEmbed()
        .setTitle("Информация о сервере")
        .setDescription(`👑Овнер: ${message.guild.ownerId}
🆔Айди: ${message.guild.id}
🚅Название: ${message.guild.name}
👮Участников: ${message.guild.memberCount}
📺Канал с новостями: ${news}
🆙Уровень сложности: ${message.guild.verificationLevel}
📍Локация: ${message.guild.preferredLocale}`)
        .setTimestamp()
        message.reply({ embeds: [embed] });
    },
};
