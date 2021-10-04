module.exports = {
  name: 'interactionCreate',
  once: 'false',
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'ping') {
      await interaction.reply('Test!');
    }
  }
}
