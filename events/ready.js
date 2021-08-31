module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
	  console.log(`Ready ${client.user.username}`);
	  const statuses = [`Программирование`, `Книгу программирования по js(javascript)`]
	  const types = ["WATCHING", "LISTENING"]
	  
	  const rnd = statuses[Math.floor(Math.random() * statuses.length)]
      const rnd2 = types[Math.floor(Math.random() * types.length)]
	  
	  setInterval(() => {
	    client.user.setActivity(rnd, {type: rnd2})
	  }, 30000)
	},
};
