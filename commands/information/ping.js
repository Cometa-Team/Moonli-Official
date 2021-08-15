const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        .setTitle("Пинг")
        .setDescription(`${client.ws.ping}ms`)
        .setTimestamp()
        message.reply({ embeds: [embed] });
        //message.channel.send(`${client.ws.ping}ms`);
    },
};
