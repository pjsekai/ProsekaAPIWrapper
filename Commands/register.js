const { MessageEmbed } = require('discord.js');
const userModel = require('../Models/user');
const authModel = require('../Models/auth');
const axios = require('axios')
const {randomBytes} = require('crypto')
const instance = axios.create({
  baseURL: process.env.BASE_API_URL
});
instance.defaults.headers.common['x-api-token'] = process.env.API_TOKEN

module.exports = {
	name: 'register',
	aliases: [],
	disabled: false,
	cooldown: 0,
	ownerOnly: true,
  guild: true,

	async execute(message, args, client) {
	  if(!args[0]){
	    return message.channel.send('プロセカIDを入力してください\n`ps!register 1234567890`')
	  }
	  
	  const sekaiIdReg = new RegExp(/^[0-9]{16,17}/gm)
	  if(sekaiIdReg.test(args[0])){
	    
	    var USER = await userModel.findOne({
	        discordId:message.author.id,
	        guildId:message.guild.id,
	      })
      var AUTH = await authModel.findOne({
        discordId:message.author.id,
      })
	   if(!USER){
       if(AUTH){
         return message.channel.send("認証待機中です。")
       }
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('')

      function generateRandomString(length) {
        return randomBytes(length).reduce((p, i) => p + chars[(i % 32)], '')
      }
      const string = generateRandomString(5);
       message.author.send(`${string}`)
       message.author.send("①上記の文字列を、プロセカの'ひと言'に貼り付けてください(認証が終わったら削除しても支障ありません)\n②`ps!auth`とDMに送信してください(登録完了のメッセージが表示されれば、'ひと言'を変更しても大丈夫です。)")
	     message.reply("本人確認が必要です\nDMに認証方法を送信しました。")

       const auth = new authModel({
          guildId: message.guild.id,
          discordId: message.author.id,
          sekaiId: args[0],
          limit: 1,
          string: string
       })

       await auth.save();

/*
        try {
          var response = await instance.get(`/user/${args[0]}/profile`)
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
	     
	    USER = new userModel({
          guildId: message.guild.id,
          discordId: message.author.id,
          sekaiId: args[0],
          limit: 1,
          sekaiProfile: response.data,
	    })
	    
	    await USER.save();*/
	   }else{
	     return message.channel.send('既に登録されています。')
	   }
	      
	  }else{
	    message.channel.send('ユーザーIDではありません')
	  }
	  
	}
};