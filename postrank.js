const { MessageEmbed } = require("discord.js");
const { fetchData } = require("./util/Util.js");
const createBar = require("string-progressbar");
const axios = require("axios");
const moment = require("moment")

exports.POSTRANK = async(client) => { 
  const EVENT_NAME = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/events.json")
  let event = EVENT_NAME
  var inEvent;
  if (Date.now() < event[event.length - 1]["startAt"]) {
    inEvent = Date.now() < event[event.length - 2]["aggregateAt"] ? true : false;
  } else {
    inEvent = Date.now() < event[event.length - 1]["aggregateAt"] ? true : false;
  }
  let rank_embed = new MessageEmbed()
  .setTimestamp()

  let NowEventId;
	if (Date.now() < EVENT_NAME[EVENT_NAME.length - 1]["startAt"]) {
		NowEventId = EVENT_NAME[EVENT_NAME.length - 2]["id"];
	} else {
		NowEventId = EVENT_NAME[EVENT_NAME.length - 1]["id"]
	}
  
  rank_embed.setTitle(`${EVENT_NAME[NowEventId-1].name} | イベントランキング`)
  .setImage(`https://sekai-res.dnaroma.eu/file/sekai-assets/home/banner/${EVENT_NAME[NowEventId-1].assetbundleName}_rip/${EVENT_NAME[NowEventId-1].assetbundleName}.webp`)
  .addField("残り時間:", ` **${moment(moment(EVENT_NAME[NowEventId-1].aggregateAt).diff(moment(Date.now()))).add(-1,"days").format("DD日HH時間mm分ss秒")}**
      \n[${createBar(EVENT_NAME[NowEventId-1].aggregateAt - EVENT_NAME[NowEventId-1].startAt, Date.now() - EVENT_NAME[NowEventId-1].startAt, 15)[0]}]`)

  var _1st = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"1",
      limit:"1",
      }
  })
  var _2nd = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"2",
      limit:"1",
      }
  })
  var _10th = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"10",
      limit:"1",
      }
  })
  var _50 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"50",
      limit:"1",
      }
  })
  var _100 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"100",
      limit:"1",
      }
  })
  var _500 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"500",
      limit:"1",
      }
  })
  var _1000 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"1000",
      limit:"1",
      }
  })
  var _5000 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"5000",
      limit:"1",
      }
  })
  var _10000 = await axios({
    method : "GET",
    baseURL : process.env.SEKAI_PUBLIC_API_BASE_URL,
    url:process.env.SEKAI_PUBLIC_API_GET_EVENT_WITH_ID.replace("{{id}}",NowEventId),
    params:{
      rank:"10000",
      limit:"1",
      }
  })

  _1st = _1st.data.data.eventRankings[0]
  _2nd = _2nd.data.data.eventRankings[0]
  _10th = _10th.data.data.eventRankings[0]
  _50 = _50.data.data.eventRankings[0]
  _100 = _100.data.data.eventRankings[0]
  _500 = _500.data.data.eventRankings[0]
  _1000 = _1000.data.data.eventRankings[0]
  _5000 = _5000.data.data.eventRankings[0]
  _10000 = _10000.data.data.eventRankings[0]

  rank_embed.setDescription(`
  1位 : ${_1st.userName} | ポイント : ${_1st.score}\n
  2位 : ${_2nd.userName} | ポイント : ${_2nd.score}\n
  10位 : ${_10th.userName} | ポイント : ${_10th.score}\n
  50位 : ${_50.userName} | ポイント : ${_50.score}\n
  100位 : ${_100.userName} | ポイント : ${_100.score}\n
  500位 : ${_500.userName} | ポイント : ${_500.score}\n
  1000位 : ${_1000.userName} | ポイント : ${_1000.score}\n
  5000位 : ${_5000.userName} | ポイント : ${_5000.score}\n
  10000位 : ${_10000.userName} | ポイント : ${_10000.score}\n
  `)


if(inEvent){
  client.channels.cache.get("786953511182401566").send(rank_embed)
}

}