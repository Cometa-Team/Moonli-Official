module.exports = {
        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "owner",
        admin: true,
        async execute(client, message, args) {
        
        let guild = null;

        if (!args[0]) return message.channel.send({ content: "Введи имя сервера!!!" })
        if(args[0]){
            let fetched = client.guilds.cache.find(g => g.name === args.join(" "));
            let found = client.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send({ content: "Неправильное имя сервера!" });
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send({ content: "Произошла ошибка Повторите попытку!" }); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send({ content: `${err} произошло!` });
            });
            message.channel.send({ content: invite.url });
        } else {
            return message.channel.send({ content: `\`${args.join(' ')}\` - Бота нет на этом сервере` });
        }

    }

}
