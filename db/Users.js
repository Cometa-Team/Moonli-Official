const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    bitcoin: { type: Number, default: 0 },
    donbitcoin: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    warn: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)