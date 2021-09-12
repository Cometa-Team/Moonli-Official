const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "t-h",
    description: "Посмотреть свой или чжой профиль",
    async execute(client, message, args) {

        if(!args[0]) {
          const row = new MessageActionRow()
          .addComponents(
		new MessageSelectMenu()
	        .setCustomId('select')
		.setPlaceholder('Nothing selected')
		.addOptions([{
			     label: 'Select me',
			     description: 'This is a description',
			     value: 'first_option',
			     },
			     {
			     label: 'You can select me too',
			     description: 'This is also a description',
			     value: 'second_option',
			     },
			   ]),
			 );
          message.channel.send({ content: 'Pong!', components: [row] })
        }
    }
}
