const { MessageEmbed, MessageAttachment } = require('discord.js');
const userModel = require('../Models/user');
const axios = require('axios');
const instance = axios.create({
  baseURL: process.env.BASE_API_URL
});
instance.defaults.headers.common['x-api-token'] = process.env.API_TOKEN


module.exports = {
	name: 'myranking',
	aliases: ['mr'],
	disabled: true,
	cooldown: 0,
	ownerOnly: true,
  guild: true,

	async execute(message, args, client) {
	  let rank_embed = new MessageEmbed;
	    
	  const USER = await userModel.findOne({
	     discordId:message.author.id,
	     guildId:message.guild.id,
	   })
	   if(!USER){
	     return message.channel.send('`register`コマンドで登録してください')
	   }
     //USER.
	   

	  message.channel.send(rank_embed)
	}
};