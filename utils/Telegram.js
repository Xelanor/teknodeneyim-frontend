const https = require("https");

Telegram = bot_message => {
  bot_token = "998128889:AAEZpQszy8VDHXAFIuCZrTPRthrwXOhgKro";
  bot_chatID = "-357762212";
  send_text =
    "https://api.telegram.org/bot" +
    bot_token +
    "/sendMessage?chat_id=" +
    bot_chatID +
    "&parse_mode=Markdown&text=" +
    bot_message;
    
  https.get(send_text);
};

module.exports = Telegram;
