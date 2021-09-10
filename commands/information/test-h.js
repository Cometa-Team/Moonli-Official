const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "user",
    description: "Посмотреть свой или чжой профиль",
    async execute(client, message, args) {
        const wait = require('util').promisify(setTimeout);

        collector.on('collect', async i => {
	        if (i.customId === 'primary') {
		        await i.deferUpdate();
		        await wait(4000);
		        await i.editReply({ content: 'A button was clicked!', components: [] });
	        }
             });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    }
}
