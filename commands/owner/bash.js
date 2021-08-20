const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'bash',
  description: 'Команды в консоль',
  args: true,
  admin: true,
  category: 'owner',
  usage: '<команда в консоль>',
  aliases: ['exe', 'console', 'shell'],
  async execute(client, message, args) {
    let embed = new MessageEmbed()
    .setTitle('Bash|Консоль')
    .setDescription('Жду ответа...')
    const msg = await message.channel.send({ embeds: [embed] })
    try {
      let out = require('child_process').execSync(args.join(' ')).toString('utf8')
            msg.edit(`\`\`\`${out ? out : 'нет выхода.'}\`\`\``)
    }catch(err) {
      msg.edit(`\`\`\`${err}\`\`\``)
    }
    },
}
