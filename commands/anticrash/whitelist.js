module.exports = {
    name: "whitelist",
    description: "Добавить в Белый Список, чтобы бот вас игнорировал вас",
    async execute(client, message, args) {
        let embed = new DiscordMessageEmbed()
        .setTitle("Вайтлист")
        .setColor(0x00ff09)
        .setDescription("Скоро...")
        message.channel.send(embed)
    }
}