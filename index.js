require('dotenv').config;
require('./KeepAlive.js')
const { Client } = require('discord.js');
const client = new Client({
	partials: ['GUILD_MEMBER', 'MESSAGE', 'CHANNEL', 'REACTION'],
	disableMentions: 'everyone'
});

const chalk = require('chalk');
const owners = require('./owner.json');
client.owners = owners;

require('./Core/loadEvent.js')(client);
require('./load.js');


client.login(process.env.BOT_TOKEN);
