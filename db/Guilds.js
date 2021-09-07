const config = require('../config.json')
const schema = mongoose.Schema({
    guildID: String,
    prefix: { type: String, default: config.prefix },
    premium: { type: String, default: "нет" }
});
module.exports = mongoose.model("Guild", schema)
