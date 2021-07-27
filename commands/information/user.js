module.exports = {
    name: "user",
    description: "Посмотреть свой или чжой профиль",
    async execute(client, message, args) {
        let embed = new DiscordMessageEmbed()
        .setTitle("Информация о пользователе")
        .setColor(0x0000ff)
        .setDescription("Скоро...")
    }
}