const Discord = require("discord.js");

module.exports = {
	name: "ping",
	description: "Пинг бота",
	async execute(client, message, args) {
		let embed = new Discord.MessageEmbed()
		.setTitle("Мой пинг")
		.setDescription(`Мой пинг: ${client.ws.ping}ms`)
		.setTimestamp()
		message.channel.send(embed)
 }
}
