const TelegramBot = require('node-telegram-bot-api');
const argv = require('minimist')(process.argv.slice(2))
const _ = require('lodash')
const MongoClient = require('mongodb').MongoClient



// replace the value below with the Telegram token you receive from @BotFather
const token = argv._[0]
const mongoUrl = 'mongodb://localhost:27017/tgWeather'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const attachBot = (bot, db) => {
  bot.onText(/\/warning (over|under) (-|\+\d+) (\d+) (hours|days)/, (msg, match) => {
    const chatId = msg.chat.id;
    console.log(match)
    const resp = match[1]; // the captured "whateveir"
    db.collection('alarms').insert({
      msg,
      type: match[1],
      temp: match[2],
      time: match[3],
      timeUnit: match[4]
    })
    bot.sendMessage(chatId, resp);
  });
}

MongoClient.connect(mongoUrl, (err, db) => {
  attachBot(bot, db)
})
