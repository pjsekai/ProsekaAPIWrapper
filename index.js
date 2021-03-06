require('dotenv').config;
require('./KeepAlive.js')
const { Client } = require('discord.js');
const cron = require("node-cron")
const { POSTRANK } = require("./postrank.js")
const { POSTINFO } = require("./postinfo.js");
const client = new Client({
	partials: ['GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'],
	disableMentions: 'everyone'
});

const chalk = require('chalk');
const owners = require('./owner.json');
client.owners = owners;

require('./Core/loadEvent.js')(client);
require('./load.js');



cron.schedule('0 * * * *', () => {
  POSTRANK(client);
});
cron.schedule('30 * * * *', ()=> {
  POSTINFO(client);
})


client.login(process.env.BOT_TOKEN);