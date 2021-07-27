const Discord = require("discord.js");

module.exports = {
	name: "ping",
	description: "Пинг бота",
	async execute(client, message, args) {
		let embed = new Discord.MessageEmbed()
		.setTitle("Мой пинг")
		.setColor(0x00ff09)
		.setDescription(`Мой пинг: ${client.ws.ping}ms`)
		.setTimestamp()
		message.channel.send(embed)
 }
}
