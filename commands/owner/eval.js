const Discord = require("discord.js");
const os = require('os')

module.exports = {
    name: "eval",
    description: "Eval",
    args: true,
    usage: '<ваш код>( без <>)',
    aliases: ['ebal', 'e'],
    category: "owner",
    async execute(client, message, args) {
        if (message.content.indexOf("fs") > -1 && message.content.indexOf("token") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("leave") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("require") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("echo $@") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("client.destroy") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("for") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("while") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("process") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("setInterval") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("throw") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("global") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("this") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("eval eval") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("os") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("client.token") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("client") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("re") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("JSON") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("Object") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("Function") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("[") > -1 && message.content.indexOf("(") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("mod") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("undefined") > -1) {
              return message.channel.send("Иди нахуй")
        }
        if (message.content.indexOf("=") > -1 && message.content.indexOf(">") > -1 && message.content.indexOf("=>") > -1 && message.content.indexOf("constructor") > -1 && message.content.indexOf("message.channel.send") > -1 && message.content.indexOf("toString") > -1 && message.content.indexOf("arg") > -1 && message.content.indexOf("..toSring") > -1 && message.content.includes("throw") > -1) {
              return message.channel.send("Недоступно")
        }
      	const database = `Eval {
      	id: ${message.author.id},
      	username: ${message.author.username},
      	discriminator: ${message.author.discriminator},
      	tag: ${message.author.tag},
      	guild: ${message.guild.name},
      	guildID: ${message.guild.id},
      	text: ${args.join(" ")}
      	}`
      	let tyyype = {
      	  "Undefined": "Неопределенный",
          "Boolean": "Логический",
          "Number": "Число",
          "String": "Строка",
          "Object": "Объект"
      	}
      	try {
      	  let evaled = eval(args.join(' ')); 
      	  if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
      	  let eevaled = typeof evaled; 
      	  evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
      	  const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
      	  let embed = new Discord.MessageEmbed()
      	  .setTitle(`Eval`)
          .setColor(client.color)
          .setDescription(`**Успешно**
          **Тип:** \`${tyyype[tyype]}\`
          **Готово за:** \`${new Date().getTime() - message.createdTimestamp + 'ms'}\`
          **Вход:**\`\`\`js\n${args.join(' ')} \`\`\`\n**Выход:**\`\`\`js\n${evaled}\`\`\``)
          message.reply({ embeds: [embed] })
      	} catch(err) {
      	  let errembed = new Discord.MessageEmbed()
      	  .setTitle(`Eval`)
          .setDescription(`Ошибка
  \n\`${err}\``)
  message.reply({ embeds: [errembed] })
  }
}
};
