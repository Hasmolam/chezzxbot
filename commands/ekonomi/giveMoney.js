// giveMoney.js dosyası

const { money } = require('../../bot.js');

function giveMoney(message, args) {
  const senderId = message.author.id;
  const recipientId = message.mentions.users.first()?.id;
  if (!recipientId) {
    message.channel.send(`Kullanıcı etiketleyin: \`xgiveadmin @username amount\``);
    return;
  }
  const recipientMoney = money[recipientId] || 0;
  const amount = parseInt(args[1]);
  if (!money[senderId]) {
    message.channel.send(`Para göndermek için bir miktar paranız olması gerekir.`);
    return;
  }
  if (!amount || amount <= 0) {
    message.channel.send(`Geçersiz para miktarı. Lütfen pozitif bir sayı girin.`);
    return;
  }
  if (money[senderId] < amount) {
    message.channel.send(`Bu işlemi yapmak için yeterli paran yok.`);
    return;
  }
  if (senderId === recipientId) {
    message.channel.send(`Bu kadar yalnız olamazsın.`);
    return;
  }

  money[senderId] -= amount;
  money[recipientId] = recipientMoney + amount;
  message.channel.send(`${message.author.username}, ${args[0]} kullanıcısına ${amount} kadar para gönderdi.`);
}


module.exports = giveMoney;
