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
        if (message.content.indexOf("fs") > -1) {
              message.channel.send("Недоступно")
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
