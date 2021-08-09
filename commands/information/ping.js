const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) => {
        message.channel.send(`${client.ws.ping}ms`);
    },
};
