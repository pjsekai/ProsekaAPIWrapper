const {
	MessageEmbed
} = require('discord.js');
const Cid = "782552363231215636";
const WebhookURL = process.env.HOOK;

module.exports = {
	name: 'hook',
	aliases: [],
	disabled: false,
	cooldown: 0,
	ownerOnly: true,
	guild: false,

	async execute(message, args, client) {
    const emoji1 = message.guild.emojis.cache.get("838031851964727326")
    const emoji2 = message.guild.emojis.cache.get("838031851896569866")
    client.fetchWebhook(process.env.HOOK_ID,process.env.HOOK_TOKEN)
      .then(hook => {
        hook.send(
          new MessageEmbed()
          .setTitle("チアフルライブロール")
          .setDescription("自分の所属しているチームのロールをつけられます！")
          .addField("ロール:",`${emoji1},${emoji2}`)
        )
      })
	}
};
