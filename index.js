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
    console.log(msg)
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whateveir"
    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['va ha hacer frio'],
          ['va hacer la caló']
        ]
      })
    }
    db.collection('alarms').insert({
      msg,
      type: match[1],
      temp: match[2],
      time: match[3],
      timeUnit: match[4]
    })
    bot.sendMessage(chatId, resp, opts);

  });
}

MongoClient.connect(mongoUrl, (err, db) => {
  attachBot(bot, db)
})
