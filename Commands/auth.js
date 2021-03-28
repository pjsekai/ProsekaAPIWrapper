const { MessageEmbed } = require('discord.js');
const userModel = require('../Models/user');
const authModel = require('../Models/auth');
const axios = require('axios')
const { EVENT_NAME } = require("../load")
const instance = axios.create({
  baseURL: process.env.BASE_API_URL
});
instance.defaults.headers.common['x-api-token'] = process.env.API_TOKEN

module.exports = {
	name: 'auth',
	aliases: [],
	disabled: false,
	cooldown: 0,
	ownerOnly: true,
  guild: false,

	async execute(message, args, client) {

    let auth_embed = new MessageEmbed();

	  if(message.guild){
	    return;
	  }
	  
	  
      var auth_info = await authModel.findOne({
        discordId: message.author.id,
      })
      if(!auth_info){
        return message.reply("`ps!register`を先に使用してください")
      }

      let NowEventId;
      if (Date.now() < EVENT_NAME[EVENT_NAME.length - 1]["startAt"]) {
        NowEventId = EVENT_NAME[EVENT_NAME.length - 2]["id"];
      } else {
        NowEventId = EVENT_NAME[EVENT_NAME.length - 1]["id"]
      }

      try {
          var response = await instance.get(`/user/${auth_info.sekaiId}/profile`)
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        
      try{
        var resevent = await instance.get(`/user/${auth_info.sekaiId}/event/${NowEventId}/ranking`)
        console.log(resevent.data);
      }catch(error){
        console.error(error);
      }
	     
      if(response.data.data.userProfile.word != auth_info.string){
        return message.reply("認証に失敗しました。")
      }

	    let USER = new userModel({
          guildId: auth_info.guildId,
          discordId: message.author.id,
          sekaiId: auth_info.sekaiId,
          limit: 1,
          sekaiProfile: response.data,
          sekaiRanking: resevent.data
	    })
	    
	    await USER.save();
      await auth_info.deleteOne();

      auth_embed.setAuthor(message.author.tag,message.author.displayAvatarURL)
      .setTitle("プロセカユーザー名:"+response.data.data.user.userGamedata.name)
      .setDescription(`ひと言:${response.data.data.userProfile.word}\n
      プレイヤーランク:${response.data.data.user.userGamedata.rank}\n
      イベントランキング:${resevent.data.data.rankings[0].rank}位\n
      イベントポイント:${resevent.data.data.rankings[0].score}ポイント`)
      .setFooter("こちらの内容で登録しました。")
      .setTimestamp();

      
      message.reply(auth_embed)
	  
	}
};