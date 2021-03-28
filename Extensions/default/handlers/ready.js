const chalk = require('chalk');
const moment = require('moment-timezone');
const fs = require('fs');
const mongoose = require('mongoose');
const userModel = require('./../../../Models/user')

module.exports = async client => {
	console.log(
		chalk.bgBlue.bold(
			`CLIENT EVENT | READY ${chalk.green(
				moment(client.readyAt)
					.tz('Asia/Tokyo')
					.format('DD/MM/YYYY h:mm:ss A')
			)}`
		)
	);
	require('../loaders/loadCommands')(client);
	//require('../loaders/loadAssets');
	await mongoose.connect(
		process.env.MongoURL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		}
	);
  /*let rxy = await userModel.findOne({
    discordId:"455421277843357708"
  })
  const data = rxy.sekaiRanking
  let masterData2 = JSON.stringify(data, null, ' ')
fs.writeFileSync('output2.json', masterData2);*/
	console.log(
		chalk.bgBlue.bold(
			`MongoDB | READY ${chalk.green(
				moment(Date.now())
					.tz('Asia/Tokyo')
					.format('DD/MM/YYYY h:mm:ss A')
			)}`
		)
	);
};
