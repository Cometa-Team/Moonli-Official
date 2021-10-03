const discord = require('discord.js');

module.exports = {
  name: 'reload-cmd',
  description: "Перезагрузить команду",
  admin: true,
  aliases: ['rel', 'рел', 'релоад'],
  usage: '<команда>',
  category: 'owner',
  args: true,
  execute(client, message, args) {
    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) {
      return message.channel.send({ content: `Нет команды с именем или псевдонимом \`${commandName}\`!` });
    }
      
    delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

    try {
      const newCommand = require(`../${command.category}/${command.name}.js`);
      client.commands.set(newCommand.name, newCommand);
      message.channel.send({ content: `Команда \`${command.name}\` успешно перезагружена!` });
    } catch(err) {
      message.channel.send({ content: `Ошибка в команде \`${command.name}\`!\n\n\`\`\`${err.stack}\`\`\`` });
    }
  },
};
