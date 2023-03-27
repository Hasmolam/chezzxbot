// showMoney.js dosyası

const { money } = require('../../bot.js');

function showMoney(message) {
  const userId = message.author.id;
  const userMoney = money[userId] || 0; // if the user has no money yet, return 0
  message.channel.send(`Şuanda ${userMoney} kadar paran var.`);
}

module.exports = showMoney;
