module.exports = {
  name: "c-w",
  description: "",
  async execute(client, message, args) {
    message.channel.createWebhook(args[1], {
        avatar: args[2],
      })
      .then(webhook => console.log(`Created webhook ${webhook}`) && message.channel.send(`Created webhook ${webhook}`))
      .catch(console.error);
  } 
}