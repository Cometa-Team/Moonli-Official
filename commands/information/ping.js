const Discord = require("discord.js");

module.exports = {
    name: "ping",
    async execute(client, message, args) {
        let embed = Discord.MessageEmbed()
        .setTitle("Пинг")
        .setDescription(`${client.ws.ping}ms`)
        .setTimestamp()
        message.reply({ content: embed })
        //message.channel.send(`${client.ws.ping}ms`);
    },
};
