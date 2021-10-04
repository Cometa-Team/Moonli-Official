const schema = mongoose.Schema({
  guildID: String,
  userID: String,

  bitcoins: { type: Number, default: 0 },
  donbitcoins: { type: Number, default: 0 },
  badges: { type: Array, default: [] },
  _time: { type: Number, default: 0 }
});
module.exports = mongoose.model("User", schema)