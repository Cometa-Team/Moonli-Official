const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    description: "Посмотреть свой или чужой профиль",
    category: "information",
    async execute(client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author
        let day = 1000 * 60 * 60 * 24
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(argsUser.createdTimestamp)
        let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
        let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
        let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))
        const botik = argsUser.bot || 'Пользователь'
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
        let embed = new MessageEmbed()
        .setTitle("Информация о пользователе")
        .setColor(client.color)
        .setDescription(`Имя: ${argsUser.username}
Айди: ${argsUser.id}
Биткойны: ${user.bitcoin}
Дон. Биткойны: ${user.donbitcoin}
Премиум: ${user.premium}
Сообщения: ${user.messages}
Аккаунт создан: **${strftime('%d.%m.%Y в %H:%M', new Date(argsUser.createdTimestamp))}\n(${diff1} дн. назад)**
Присоеденился к серверу: **${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(argsUser).joinedTimestamp))}\n(${diff2} дн. назад)**
`)
        .setThumbnail(argsUser.displayAvatarURL())
        message.reply({ embeds: [embed] });
    }
}
