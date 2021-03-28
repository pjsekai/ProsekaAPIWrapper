const { MessageEmbed, MessageAttachment } = require('discord.js');
const userModel = require('../Models/user');
const axios = require('axios');
const { CARD_PREFIX } = require('../load');
const Canvas = require('canvas');
const fetch = require('node-fetch')
const webp=require('webp-converter');


module.exports = {
	name: 'sekaiprofile',
	aliases: ['sp'],
	disabled: false,
	cooldown: 0,
	ownerOnly: true,
  guild: true,

	async execute(message, args, client) {
	  let profile_embed = new MessageEmbed;
	    
	  const USER = await userModel.findOne({
	     discordId:message.author.id,
	     guildId:message.guild.id,
	   })
	   if(!USER){
	     return message.channel.send('`register`コマンドで登録してください')
	   }
	   
	   const profile = USER.sekaiProfile.data.userProfile
     const leaderCard = CARD_PREFIX.find(c => c.id == USER.sekaiProfile.data.userDecks[0].leader)


    // const Leader = `https://sekai-res.dnaroma.eu/file/sekai-assets/thumbnail/chara_rip/${leaderCard.assetbundleName}_normal.webp`
     
	   
	   profile_embed.setAuthor(message.author.tag,message.author.displayAvatarURL())
     .setThumbnail(`https://sekai-res.dnaroma.eu/file/sekai-assets/thumbnail/chara_rip/${leaderCard.assetbundleName}_normal.webp`)
	   .setTitle(`ユーザー名:${USER.sekaiProfile.data.user.userGamedata.name}`)
	   .setDescription(`ひとこと:${profile.word}`)
	   .addField('ユーザーランク',`${USER.sekaiProfile.data.user.userGamedata.rank}`,true)
	   /*.addField('称号ID',`${profile.honorId1},${profile.honorId2},${profile.honorId3}`,true)
	   .addField('メインデッキID',`${USER.sekaiProfile.data.user.userGamedata.deck}`)
	   .addField('デッキカードID',`${USER.sekaiProfile.data.userDecks[0].leader}`)*/

	  message.channel.send(profile_embed)
	}
};