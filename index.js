const TelegramBot = require('node-telegram-bot-api');
const argv = require('minimist')(process.argv.slice(2))
const _ = require('lodash')
// replace the value below with the Telegram token you receive from @BotFather
const token = argv._[0]

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/warning (over|under) (-|\+\d+) (\d+) (hours|days)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  console.log(match)
  const resp = match[1]; // the captured "whateveir"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
