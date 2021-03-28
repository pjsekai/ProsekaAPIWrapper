const { Schema, model } = require('mongoose');

const user = {
  guildId:String,
  discordId: String,
  sekaiId:String,
  limit: { type:Number, default:0 },
  sekaiProfile: Schema.Types.Mixed,
  sekaiRanking: Schema.Types.Mixed,
}

module.exports = model('user', user);