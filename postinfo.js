const { MessageEmbed } = require('discord.js');
const { fetchData } = require('./util/Util.js');
const axios = require('axios');
const moment = require('moment');
const plat = {
	Android: 'アンドロイド📱',
	iOS: 'iOS📱',
	all: 'iOS,アンドロイド📱'
};
const type = {
	bug: 'バグ報告📵',
	information: 'インフォメーションℹ️',
	update: 'アップデート情報⬆️',
	campaign: 'キャンペーン🎊',
	gacha: 'ガチャ📤',
	event: 'イベント情報🏆',
	music: '楽曲情報💿'
};

exports.POSTINFO = async client => {
	const INFO = await axios({
		method: 'GET',
		baseURL: process.env.SEKAI_DIFF_FILE_BASE,
		url: '/userInformations.json'
	});
	let INFO_ARRAY = INFO.data;

	let info_array = [];

	INFO_ARRAY.forEach(
		e =>
			e.startAt > Date.now()
				? e.startAt < Date.now() + 3600000
					? info_array.push(e)
					: null
				: null
	);
	for (const i of info_array) {
		let info_embed = new MessageEmbed().setTitle(i.title);
		i.browseType == 'internal'
			? info_embed.setURL(
					`https://production-web.sekai.colorfulpalette.org/${i.path}`
			  )
			: info_embed.setURL(`${i.path}`);
		info_embed.addField('通知タイプ:', `${type[i.informationTag]}`);
		info_embed.addField('通知端末:', `${plat[i.platform]}`).setTimestamp();
		client.channels.cache.get('782553626119897098').send(info_embed);
	}
};
